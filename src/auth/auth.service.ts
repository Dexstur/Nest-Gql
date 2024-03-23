import {
  Injectable,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import * as argon from 'argon2';
import { EmailDto, LookUpReturn, RegisterPayload, LoginPayload } from 'src/dto';
import { Role } from '@prisma/client';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async validateEmail(email: string) {
    const botToken = this.config.get('SLACK_BOT_TOKEN');
    const slackRes: { data: LookUpReturn } = await axios.get(
      'https://slack.com/api/users.lookupByEmail',
      {
        headers: {
          Authorization: `Bearer ${botToken}`,
        },
        params: {
          email,
        },
      },
    );
    // console.log(slackRes.data);

    if (!slackRes.data.ok && !slackRes.data.user) {
      throw new NotFoundException('User not found');
    }

    const user = {
      id: slackRes.data.user.id,
      name: slackRes.data.user.name,
      team_id: slackRes.data.user.team_id,
      real_name: slackRes.data.user.real_name,
    };

    return {
      statusCode: 200,
      message: 'User found',
      data: user,
    };
  }

  async register(dto: RegisterPayload) {
    const { email, password, name, departmentId } = dto;

    const valid = await this.validateEmail(email);

    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const slackId = valid.data.id;

    const salt = parseInt(this.config.get('SALT'));

    const hash = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        name,
        slackId,
        departmentId,
      },
    });

    const token = this.signToken(user.id, user.role);

    return {
      statusCode: 201,
      message: 'User registered',
      data: user,
      token,
    };
  }

  async login(dto: LoginPayload) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await argon.verify(user.password, password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.role);

    delete user.password;

    return {
      statusCode: 200,
      message: 'User logged in',
      data: user,
      token,
    };
  }

  signToken(id: string, role: Role) {
    const payload = { id, role };
    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRY');

    return this.jwt.sign(payload, { secret, expiresIn });
  }
}
