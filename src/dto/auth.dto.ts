import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export interface LookUpReturn {
  ok: boolean;
  user?: SlackUser;
}

interface SlackUser {
  id: string;
  name: string;
  team_id: string;
  real_name: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(6, 50)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  departmentId: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 50)
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
