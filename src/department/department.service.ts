import {
  Injectable,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto, DepartmentDto } from 'src/dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    for (const key in dto) {
      if (!dto[key]) {
        delete dto[key];
      }
    }

    return await this.prisma.department.create({
      data: dto,
    });
  }

  async addMembersAdmin() {}
}
