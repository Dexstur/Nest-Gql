import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginPayload, RegisterPayload } from 'src/dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async register(@Args('input') input: RegisterPayload) {
    return this.authService.register(input);
  }

  @Mutation()
  async login(@Args('input') input: LoginPayload) {
    return this.authService.login(input);
  }
}
