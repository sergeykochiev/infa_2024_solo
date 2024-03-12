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
import { URLSearchParams } from 'url';
import { Banner } from 'src/banner/entity/banner.entity';
import { BannerService } from 'src/banner/banner.service';

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
        private readonly itemService: ItemService,
        private readonly bannerService: BannerService,
        private readonly helper: HelperService,
    ) {}

    handleHoyoRetcode(response: hoyoResponse) {
        if (response.retcode == 0) {
            return
        }
        // 108 lang error

        this.helper.throwServerError(
            'Error with Hoyo server',
            `${response.retcode}: ${response.message}`
        )
    }

    parseHoyoUrl(hoyoUrl: string) {
        const hoyoParams = new URLSearchParams(hoyoUrl)
        return hoyoParams.get('authkey')
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
        lastId: number | undefined,
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
            if (lastId && Number(pull.id) == lastId) {
                return prevPulls
            }
            const item = new Item(
                pull.item_id,
                pull.name,
                pull.item_type,
                pull.rank_type
            )
            const banner = new Banner(
                pull.gacha_id,
                pull.gacha_type
            )
            // await this.bannerService.save(banner)
            // await this.itemService.save(item)
            prevPulls.push(new Pull(
                pull.id,
                pull.time,
                gameAccount,
                item,
                banner
            ))
        }
        params.end_id = prevPulls.slice(-1)[0].id
        await new Promise(e => setTimeout(e, 250))
        console.log('+page')
        return await this.fetchPulls(lastId, params, gameAccount, prevPulls)
    }

    async createMany(hoyoUrl: string, username: string): Promise<number> {
        const authkey = this.parseHoyoUrl(hoyoUrl)
        console.log('1')
        const user = await this.userService.findOne(username)
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
            gameAcc = new GameAccount(uid, user)
        }
        await this.gameAccountService.save(gameAcc)
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
                order: {
                    id: 'DESC'
                },
                where: {
                    banner: { type: type },
                    gameAccount: { uid: uid }
                }
            })
            let lastId: number | undefined
            if (lastPull) {
                lastId = lastPull.id
            }
            console.log(lastId)
            pulls = pulls.concat(await this.fetchPulls(lastId, params, gameAcc))
            console.log(`fetched, total now ${pulls.length}`)
        }
        await this.pullRepository.save(pulls)
        console.log('done')
        return pulls.length
    }

    async getMany(uid: number, type: BannerType, username: string): Promise<Array<Pull> | undefined> {
        return await this.pullRepository.find({
            where: {
                banner: { type: type },
                gameAccount: { uid: uid, user: { username: username } },
            }
        })
    }

    async getAll(): Promise<Array<Pull>> {
        return await this.pullRepository.find()
    }
}
