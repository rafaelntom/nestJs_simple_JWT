/* eslint-disable */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bycrpt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async hashInfo(password: string) {
    const hashedPassword = await bycrpt.hash(password, 10);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new HttpException(
        'Email is already registered',
        HttpStatus.CONFLICT,
      );
    }

    const user = {
      ...createUserDto,
      password: await this.hashInfo(createUserDto.password),
    };

    const newUser = await this.prisma.user.create({ data: user });

    return {
      ...newUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
