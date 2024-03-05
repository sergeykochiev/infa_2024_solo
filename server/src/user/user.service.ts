import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from 'src/gameacc/entity/gameacc.entity';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource
    ) {}
    
    async getGameAccounts(id: number): Promise<Array<GameAccount> | []> {
        const user = await this.userRepository.findOneBy({ id: id })
        return user.gameAccounts
    }

    async findOne(login: string): Promise<User | void> {
        return await this.userRepository.findOneBy({ login: login })
    }

    async saveOne(createUserDto: CreateUserDto): Promise<void> {
        await this.dataSource.transaction(async (manager) => {
            await manager.save(createUserDto)
        })
    }
}
