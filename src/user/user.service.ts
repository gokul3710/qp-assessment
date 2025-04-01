import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async findOne(id: number) {
        try{
            return this.userRepository.findOne({ where: { id } });
        } catch (error) {
            throw error;
        }
    }
}
