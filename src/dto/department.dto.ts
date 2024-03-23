import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  leadId: string;
}

export interface CreateDepartmentPayload {
  name: string;
  description?: string;
  leadId?: string;
}

export class DepartmentDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export interface DepartmentPayload {
  id: string;
}

export class AddMembersDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
