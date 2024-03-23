import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { GraphGuard } from 'src/auth/guards/graph.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Query('getAllUsers')
  @UseGuards(GraphGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
