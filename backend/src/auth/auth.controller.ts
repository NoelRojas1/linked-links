import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { SessionCookieGuard } from './guard';
import { GetUser, GetSessionCookie } from './decorator';
import { User } from '../schemas/user.schema';
import { SessionCookieRefreshGuard } from './guard/session-cookie-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const session = await this.authService.register(data);
    response.cookie('session', session);
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const session = await this.authService.login(data);
    response.cookie('session', session);
    return;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(SessionCookieGuard)
  @Get('verify')
  verify(@GetUser() user: Omit<User, '_id'> & { id: string }) {
    return {
      id: user.id,
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
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(SessionCookieRefreshGuard)
  @Get('refresh')
  async refresh(
    @GetUser() user: Omit<User, '_id'> & { id: string },
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const session = await this.authService.refresh(user);
    response.cookie('session', session);
    return;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('logout')
  async logout(
    @GetSessionCookie() session: string,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    if (!session) {
      return;
    }

    await this.authService.logout(session);
    response.cookie('session', '', { maxAge: 0 });
    return;
  }
}
