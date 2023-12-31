import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { IsPublic } from './decorators/is-public.decorator';

export interface AuthRequest extends Request {
  user: User;
}

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Req() req: AuthRequest) {
    return this.service.login(req.user);
  }
}
