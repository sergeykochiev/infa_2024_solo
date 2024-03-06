import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from 'src/gameacc/entity/gameacc.entity';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt'
import { UserSchema } from './entity/user.entitySchema';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserSchema)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource
    ) {}

    async findOne(login: string): Promise<User | void> {
        return await this.userRepository.findOne({
            where: {
                login: login
            }
        })
    }

    async createOne(createUserDto: CreateUserDto): Promise<void> {
        if (await this.findOne(createUserDto.login)) {
            throw new Error('Login already exists')
        }
        const password = await bcrypt.hash(createUserDto.password, 10)
        const user = new User({
            ...createUserDto,
            password: password
        })
        await this.dataSource.transaction(async (manager) => {
            await manager.save(user)
        })
    }

    async getAll(): Promise<Array<User>> {
        return await this.userRepository.find()
    }
}
