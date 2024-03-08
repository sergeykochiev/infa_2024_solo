import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async findOne(username: string): Promise<User | void> {
        return await this.userRepository.findOne({
            where: {
                username: username
            }
        })
    }

    async createOne(createUserDto: CreateUserDto): Promise<User> {
        if (await this.findOne(createUserDto.username)) {
            throw new HttpException('Login already exists', HttpStatus.CONFLICT)
        }
        const password = await bcrypt.hash(createUserDto.password, 10)
        const user = new User({
            ...createUserDto,
            password: password
        })
        await this.dataSource.transaction(async (manager) => {
            await manager.save(user)
        })
        return user
    }

    async getAll(): Promise<Array<User>> {
        return await this.userRepository.find()
    }
}
