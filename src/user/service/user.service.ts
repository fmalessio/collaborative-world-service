import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findOne(username: string, pass: string): Promise<User | undefined> {
        return this.userRepository.findOne(
            { username: username, password: pass }
        );
    }
}
