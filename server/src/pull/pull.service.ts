import { Injectable } from '@nestjs/common';
import { BannerType, Pull } from './entity/pull.entity';
import { HoyoPull } from './entity/hoyoPull.entity';
import { fetchData } from 'src/const';

interface fetchParams {
    lang: 'en',
    authkey_ver: 1,
    game_biz: 'hkrpg_global',
    gacha_type: BannerType,
    authkey: string
}

@Injectable()
export class PullService {
    async fetchPulls(lastId: number | void, params: fetchParams, pulls: Array<Pull> = [],): Promise<Array<Pull> | void> {
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
                bannerType: pull.gacha_type
            }))
        })
        await new Promise(e => setTimeout(e, 3000))
        this.fetchPulls(lastId, params, prevPulls)
    }
}
