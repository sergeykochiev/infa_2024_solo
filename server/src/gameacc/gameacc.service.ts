import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameAccountSchema } from './entity/gameacc.entitySchema';
import { CreateGameAccountDto } from './dto/createGameAccountDto';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from './entity/gameacc.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class GameAccountService {
    constructor(
        @InjectRepository(GameAccountSchema)
        private readonly gameAccountRepository: Repository<GameAccount>,
        private readonly dataSource: DataSource
    ) {}

    async findMany(username: string): Promise<Array<GameAccount> | null> {
        return await this.gameAccountRepository.find({
            where: {
                user: { username: username }
            }
        })
    }

    async findOne(uid: number): Promise<GameAccount | null> {
        return await this.gameAccountRepository.findOne({
            where: {
                uid: uid
            }
        })
    }

    async getAll(): Promise<Array<GameAccount>> {
        return await this.gameAccountRepository.find()
    }

    async deleteOne(uid: number, username: string): Promise<void> {
        await this.gameAccountRepository.remove(await this.gameAccountRepository.findOne({
            where: {
                uid: uid,
                user: { username: username }
            }
        }))
    }

    async save(gameAcc: GameAccount): Promise<void> {
        await this.gameAccountRepository.save(gameAcc)
    }
}
