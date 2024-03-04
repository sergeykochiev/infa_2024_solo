import { Injectable } from '@nestjs/common';
import { GameAccount } from './entities/gameacc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { BannerType, Pull } from 'src/pull/entities/pull.entity';
import { PullService } from 'src/pull/pull.service';
import { SavePullsDto } from '../dto/savePullsDto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GameAccountService {
    constructor(
        @InjectRepository(GameAccount)
        private readonly gameAccountRepository: Repository<GameAccount>,
        private readonly dataSource: DataSource,
    ) {}

    async saveOne(gameAccount: GameAccount): Promise<void> {
        await this.dataSource.transaction(async (manager) => {
            await manager.save(gameAccount)
        })
    }

    async getPulls(id: number, type: BannerType): Promise<Array<Pull> | []> {
        const gameAccount = await this.gameAccountRepository.findOneBy({ id: id })
        return gameAccount.pulls.filter(pull => pull.bannerType == type)
    }
}
