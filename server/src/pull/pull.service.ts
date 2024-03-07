import { HttpException, Injectable } from '@nestjs/common';
import { BannerType, Pull } from './entity/pull.entity';
import { HoyoPull } from './entity/hoyoPull.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { GameAccount } from 'src/gameacc/entity/gameacc.entity';
import { GameAccountService } from 'src/gameacc/gameacc.service';
import { PullSchema } from './entity/pull.entitySchema';
import { UserService } from 'src/user/user.service';
import { fetchData } from 'src/pull/const';
import { HelperService } from 'src/helper/helper.service';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/item/entity/item.entity';

interface fetchParams {
    lang: 'en',
    authkey_ver: 1,
    game_biz: 'hkrpg_global',
    gacha_type: BannerType,
    authkey: string,
    end_id: number
}

interface hoyoResponse {
    retcode: number,
    message: string,
    data: {
        list: Array<HoyoPull>
    } | null
}

@Injectable()
export class PullService {
    constructor(
        @InjectRepository(PullSchema)
        private readonly pullRepository: Repository<Pull>,
        private readonly gameAccountService: GameAccountService,
        private readonly userService: UserService,
        private readonly dataSource: DataSource,
        private readonly helper: HelperService,
        private readonly itemService: ItemService
    ) {}

    handleHoyoRetcode(response: hoyoResponse) {
        if (response.retcode == 0) {
            return
        }
        this.helper.throwServerError(
            'Error with Hoyo server',
            `${response.retcode}: ${response.message}`
        )
    }

    async fetchUidByAuthkey(authkey: string): Promise<number | void> { // ok
        console.log('getting uid')
        const params = { ...fetchData.hoyoParams,
        size: '1',
        gacha_type: '1',
        authkey: authkey
        }
        // Object.keys(params).map(key => params[key] = String(params[key]))
        const response = await fetch(`${fetchData.hoyoUrl}?${new URLSearchParams(
            params as unknown as Record<string, string>
        ).toString()}`)
        const parsed = await response.json()
        this.handleHoyoRetcode(parsed)
        if (parsed.data && parsed.data.list && parsed.data.list.length > 0 && parsed.data.list[0].uid) {
            console.log('returning uid')
            return parsed.data.list[0].uid
        }
        console.log('no uid')
    }

    async fetchPulls(
        lastId: number | void | undefined,
        params: fetchParams,
        gameAccount: GameAccount,
        pulls: Array<Pull> = []
    ): Promise<Array<Pull>> {
        const prevPulls: Array<Pull> = pulls
        const response = await fetch(`${fetchData.hoyoUrl}?${new URLSearchParams(
            params as unknown as Record<string, string>
        ).toString()}`)
        const parsed = await response.json()
        this.handleHoyoRetcode(parsed)
        // if (!parsed.data || !parsed.data.list) {
        //     // hoyo server error
        //     return
        // }
        if (parsed.data.list.length == 0) {
            return prevPulls
        }
        for (const pull of parsed.data.list) {
            if (lastId && pull.item_id == lastId) {
                return prevPulls
            }
            prevPulls.push(new Pull({
                id: pull.id,
                bannerId: pull.gacha_id,
                timestamp: pull.time,
                bannerType: pull.gacha_type,
                gameAccount: gameAccount,
                item: new Item({
                    id: pull.item_id,
                    name: pull.name,
                    type: pull.item_type,
                    rank: pull.rank_type
                })
            }))
        }
        params.end_id = prevPulls.slice(-1)[0].id
        await new Promise(e => setTimeout(e, 250))
        console.log('+page')
        return await this.fetchPulls(lastId, params, gameAccount, prevPulls)
    }

    async createMany(authkey: string, login: string): Promise<number> {
        console.log('1')
        const user = await this.userService.findOne(login)
        if (!user) {
            console.log('no user')
            return
        }
        const uid = await this.fetchUidByAuthkey(authkey)
        if (!uid) {
            console.log('no uid')
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
        console.log('gameacc ok')
        const bannerTypes: Array<BannerType> = [1, 11, 12]
        let pulls: Array<Pull> = []
        for (const type of bannerTypes) {
            console.log(`fetching ${type}`)
            const params = {
                ...fetchData.hoyoParams,
                gacha_type: type,
                authkey: authkey,
                end_id: 0
            }
            const lastPull = await this.pullRepository.findOne({
                where: {
                    bannerType: type,
                    gameAccount: { uid: uid }
                }
            })
            let lastId: number | undefined
            if (lastPull) {
                lastId = lastPull.id
            }
            pulls = pulls.concat(await this.fetchPulls(lastId, params, gameAcc))
            console.log(`fetched, total now ${pulls.length}`)
        }
        await this.dataSource.transaction(async (manager) => {
            await manager.save(pulls)
        })
        console.log('done')
        return pulls.length
    }

    async getMany(uid: number, type: BannerType, login: string): Promise<Array<Pull> | undefined> {
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
