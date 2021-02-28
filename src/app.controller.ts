import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/constants';

@Controller()
export class AppController {

  @Public()
  @Get()
  getHello(): string {
    return 'Hello Collaborative World';
  }

}
