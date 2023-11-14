/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async signup(dto: AuthDto) {
    const hashedPw = await this.hashData(dto.password);
    console.log(dto);
    const newUser = this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashedPw,
      },
    });
  }

  signin() {}

  signout() {}

  refresh() {}
}
