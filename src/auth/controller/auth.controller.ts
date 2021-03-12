import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUser } from '../../user/dto/user.dto';
import { Public } from '../constants';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() req: LoginUser) {
        return this.authService.login(req);
    }

    @Public()
    @Get('alive')
    alive(@Headers('Authorization') token: string) {
        return this.authService.alive(token);
    }

}
