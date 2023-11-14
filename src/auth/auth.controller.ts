/* eslint-disable */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    this.authService.signup();
  }

  @Post('signin')
  signin() {
    this.authService.signin();
  }

  @Post('signout')
  signout() {
    this.authService.signout();
  }

  @Post('refresh')
  refresh() {
    this.authService.refresh();
  }
}
