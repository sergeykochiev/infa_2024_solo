import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameAccountSchema } from './entity/gameacc.entitySchema';
import { CreateGameAccountDto } from './dto/createGameAccountDto';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from './entity/gameacc.entity';

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

    async createOne(createGameAccountDto: CreateGameAccountDto): Promise<GameAccount> {
        const gameAccount = new GameAccount(createGameAccountDto)
        await this.dataSource.transaction(async (manager) => {
            await manager.save(gameAccount)
        })
        return gameAccount
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
}
