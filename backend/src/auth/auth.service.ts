import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import crypto from 'crypto';
import { LoginDto, RegisterDto } from './dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await argon.hash(registerDto.password);
    const data = {
      email: registerDto.email,
      hashedPassword,
      username: registerDto.username,
    };
    const createdUser = await this.userModel.create(data);

    // create session
    return this.getSession(createdUser);
  }

  async login(loginDto: LoginDto) {
    const usernameOrEmail = loginDto.usernameOrEmail;
    try {
      const user = await this.userModel.findOne({
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      });

      if (!user) {
        throw new ForbiddenException('Incorrect credentials');
      }

      const isPasswordValid = await argon.verify(
        user.hashedPassword,
        loginDto.password,
      );

      if (!isPasswordValid) {
        throw new ForbiddenException('Incorrect credentials');
      }

      // create session
      return this.getSession(user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async refresh(_user: User) {
    try {
      const user = await this.userModel.findOne({
        username: _user.username,
      });

      if (!user) {
        throw new ForbiddenException('Incorrect credentials');
      }

      // create session
      return this.getSession(user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async logout(session: string) {
    await this.cacheManager.del(session);
  }

  async getSession(user: User) {
    try {
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        bgColor: user.bgColor,
        bgImage: user.bgImage,
        bgType: user.bgType,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarImage: user.avatarImage,
        lastLoggedIn: user.lastLoggedIn,
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwt.signAsync(payload, {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '7d',
          algorithm: 'HS256',
        }),
        this.jwt.signAsync(payload, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '30d',
          algorithm: 'HS256',
        }),
      ]);

      // create a session in redis
      const sessionKey = crypto
        .createHmac('sha256', this.configService.get<string>('SESSION_SECRET')!)
        .update(`user-${user.username}`)
        .digest('base64');

      await this.cacheManager.set(
        sessionKey,
        JSON.stringify({ accessToken, refreshToken }),
        Number(this.configService.get<string>('SESSION_TTL')),
      );

      return sessionKey;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
