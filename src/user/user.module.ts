import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, UserResolver],
})
export class UserModule {}
