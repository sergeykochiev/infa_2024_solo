import { Injectable } from '@nestjs/common';
import { BannerType, Pull } from './entity/pull.entity';
import { HoyoPull } from './entity/hoyoPull.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from 'src/gameacc/entity/gameacc.entity';
import { GameAccountService } from 'src/gameacc/gameacc.service';
import { PullSchema } from './entity/pull.entitySchema';
import { UserService } from 'src/user/user.service';
import { fetchData } from 'src/pull/const';

interface fetchParams {
    lang: 'en',
    authkey_ver: 1,
    game_biz: 'hkrpg_global',
    gacha_type: BannerType,
    authkey: string
}

@Injectable()
export class PullService {
    constructor(
        @InjectRepository(PullSchema)
        private readonly pullRepository: Repository<Pull>,
        private readonly gameAccountService: GameAccountService,
        private readonly userService: UserService,
        private readonly dataSource: DataSource
    ) {}

    async fetchUidByAuthkey(authkey: string): Promise<number | void> { // ok
        const params = { ...fetchData.hoyoParams,
        'size': 1,
        'gacha_type': 1,
        'authkey': authkey
        }
        const response = await fetch(`${fetchData.hoyoUrl}/?${new URLSearchParams(params.toString()).toString()}`)
        const parsed = await response.json()
        if (parsed.data && parsed.data.list && parsed.data.list.length > 0 && parsed.data.list[0].uid) {
            return parsed.data.list[0].uid
        }
    }

    async fetchPulls(lastId: number | void | undefined, params: fetchParams, gameAccount: GameAccount, pulls: Array<Pull> = []): Promise<Array<Pull> | void> {
        const prevPulls: Array<Pull> = pulls
        const response = await fetch(`${fetchData.hoyoUrl}/?${new URLSearchParams(params.toString()).toString()}`)
        const parsed = await response.json()
        if (!parsed.data || !parsed.data.list) {
            // hoyo server error
            return
        }
        if (parsed.data.list.length == 0) {
            return prevPulls
        }
        parsed.forEach((pull: HoyoPull) => {
            if (lastId && pull.item_id == lastId) {
                return prevPulls
            }
            prevPulls.push(new Pull({
                id: pull.id,
                bannerId: pull.gacha_id,
                itemId: pull.item_id,
                timestamp: pull.time,
                bannerType: pull.gacha_type,
                gameAccount: gameAccount
            }))
        })
        await new Promise(e => setTimeout(e, 3000))
        this.fetchPulls(lastId, params, gameAccount, prevPulls)
    }

    async createMany(authkey: string, login: string): Promise<void> {
        const user = await this.userService.findOne(login)
        if (!user) {
            return
        }
        const uid = await this.fetchUidByAuthkey(authkey)
        if (!uid) {
          //error with hoyo server
          return
        }
        let gameAcc = await this.gameAccountService.findOne(uid)
        if (!gameAcc) {
            gameAcc = await this.gameAccountService.createOne({
                uid: uid,
                user: user
            })
        }
        const bannerTypes: Array<BannerType> = [1, 11, 12]
        const pulls = []
        bannerTypes.forEach(async type => {
            const params = {
                ...fetchData.hoyoParams,
                gacha_type: type,
                authkey: authkey
            }
            const lastId: number | undefined = (await this.pullRepository.findOne({
                where: {
                    bannerType: type,
                    gameAccount: { uid: uid }
                }
            })).id
            pulls.concat(await this.fetchPulls(lastId, params, gameAcc))
        })
        await this.dataSource.transaction(async (manager) => {
            await manager.save(pulls)
        })
    }

    async getMany(uid: number, type: BannerType, login: string): Promise<Array<Pull> | void> {
        return await this.pullRepository.find({
            where: {
                bannerType: type,
                gameAccount: { uid: uid, user: { login: login } },
            }
        })
    }

    async getAll(): Promise<Array<Pull>> {
        return await this.pullRepository.find()
    }
}
