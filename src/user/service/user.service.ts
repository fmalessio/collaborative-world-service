import { Injectable } from '@nestjs/common';
import { LoginUser } from '../dto/user.dto';

@Injectable()
export class UserService {
    private readonly users = [
        {
            username: 'john',
            password: 'changeme',
        },
        {
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<LoginUser | undefined> {
        return this.users.find(user => user.username === username);
    }
}
