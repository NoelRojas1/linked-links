import {
  Body,
  Controller,
  ForbiddenException,
  Get, HttpCode, HttpStatus,
  Param,
  Put, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { GetUser } from '../auth/decorator';
import { SessionCookieGuard } from '../auth/guard';

@Controller('user')
@UseGuards(SessionCookieGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  me() {
    return true;
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  updateUserInfo(
    @GetUser('id') sessionUserId: string,
    @Param('id') userId: string,
    @Body() data: UpdateUserDto,
  ) {
    // userId must match user id in session
    if (sessionUserId !== userId) {
      throw new ForbiddenException();
    }
    return this.userService.updateUserInfo(userId, data);
  }
}
