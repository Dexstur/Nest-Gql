import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';

interface PayloadReturn {
  iat: number;
  exp: number;
}

interface RegKeyReturn extends PayloadReturn {
  id: string;
  role: Role;
}

@Injectable()
export class GraphGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const secret = this.config.get('JWT_SECRET');

    try {
      const decoded = this.jwtService.verify(token.split(' ')[1], {
        secret,
      }) as RegKeyReturn;
      req.user = decoded; // Attach user information to the request
      return true;
    } catch (err) {
      console.error(err);
      console.error('Did not resolve token');
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
