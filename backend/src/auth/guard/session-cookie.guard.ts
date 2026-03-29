import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionCookieGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.cookies) {
      const session = request.cookies['session'];

      if (!session) {
        return false;
      }

      const cachedSession = (await this.cacheManager.get(session)) as string;

      if (!cachedSession) {
        return false;
      }

      const jwtToken = JSON.parse(cachedSession).accessToken as string;
      const user = await this.jwt.verify(jwtToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.user = user;

      return true;
    }
    return false;
  }
}
