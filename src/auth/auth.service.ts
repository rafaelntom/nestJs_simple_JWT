import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  validateUser(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async login() {
    return await this.prisma.user.findUnique({
      where: {
        email: 'paulo@salvatore.tech',
      },
    });
  }
}
