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

@Injectable()
export class RoleGuardQL implements CanActivate {
  constructor(private requiredRole: Role) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const userRole = req.user?.role;
    if (!req.user || userRole == this.requiredRole) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
