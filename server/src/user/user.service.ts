import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from 'src/gameacc/entity/gameacc.entity';
import { CreateUserDto } from './dto/createUserDto';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource
    ) {}

    async findOne(login: string): Promise<User | void> {
        return await this.userRepository.findOneBy({ login: login })
    }

    async createOne(createUserDto: CreateUserDto): Promise<void> {
        if (await this.findOne(createUserDto.login)) {
            throw new Error('Login already exists')
        }
        await this.dataSource.transaction(async (manager) => {
            await manager.save(new User({
                ...createUserDto,
                password: await bcrypt.hash(createUserDto.password, 10)
            }))
        })
    }

    async saveOne(user: User): Promise<void> {
        await this.dataSource.transaction(async (manager) => {
            await manager.save(user)
        })
    }
}
