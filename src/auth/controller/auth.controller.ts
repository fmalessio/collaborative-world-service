import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUser } from '../../user/dto/user.dto';
import { Public } from '../constants';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Body() req: LoginUser) {
        return this.authService.login(req);
    }

    @Get('alive')
    alive(@Headers('Authorization') token: string) {
        return this.authService.alive(token);
    }

}
