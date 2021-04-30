import { Injectable, InternalServerErrorException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, throwError } from 'rxjs';
import { LoggedUser, LoginUser } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async login(loginUser: LoginUser): Promise<LoggedUser> {
        const user: User = await this.usersService.findOne(
            loginUser.username,
            loginUser.password);
        if (!user) {
            throw new UnauthorizedException('Usuario o contraseña inválidos');
        }
        delete user.password;
        delete user.notifications;
        delete user.active;
        const payload = { username: user.username, app: 'collaborative-world-service' };
        const loggedUser: LoggedUser = Object.assign(
            user,
            { access_token: this.jwtService.sign(payload) }
        );
        return loggedUser;
    }

    alive(token: string): boolean {
        token = token.replace('Bearer ', '');
        const decoded: any = this.jwtService.decode(token);
        const tokenExp = new Date(0);
        tokenExp.setUTCSeconds(decoded.exp);
        return new Date() < tokenExp;
    }
}
