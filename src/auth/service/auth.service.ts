import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username, pass);
        return user ? user : null;
    }

    async login(user: any) {
        const payload = { username: user.username, app: 'collaborative-world-service' };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    alive(token: string): boolean {
        token = token.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token);
        const tokenExp = new Date(0);
        tokenExp.setUTCSeconds(decoded.exp);
        return new Date() < tokenExp;
    }
}
