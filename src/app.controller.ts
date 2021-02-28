import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from './auth/constants';
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
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
