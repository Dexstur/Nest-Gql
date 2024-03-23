import {
  Body,
  Controller,
  Post,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(JwtGuard)
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return {
      statusCode: 200,
      message: 'Users',
      data: users,
    };
  }
}
