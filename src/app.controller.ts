import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { AuthService } from './auth/service/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Get()
  getHello(): string {
    return 'Hello Collaborative World';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
