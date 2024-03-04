import { Injectable } from '@nestjs/common';
import { HoyoPull } from 'src/pull/hoyo.pull';
import { Pull } from 'src/pull/pull';
import { PullService } from 'src/pull/pull.service';
import { UserUid } from 'src/uid/useruid';
import { UserUidService } from 'src/uid/useruid.service';

@Injectable()
export class HistoryService {
    private readonly data = {
        hoyoUrl: 'https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog',
        hoyoParams: {
            'lang': 'en',
            'authkey_ver': 1,
            'size': 20,
            'game_biz': 'hkrpg_global',
        }
    }
       
    constructor(
        private readonly pullService: PullService,
        private readonly userUidService: UserUidService
    ) {}

    private async fetchPulls(userId: number, lastId: number, pulls: Array<Pull> = []): Promise<Array<Pull> | void> {
        const prevPulls: Array<Pull> = pulls
        const response = await fetch(`${this.data.hoyoUrl}/?${new URLSearchParams(this.data.hoyoParams.toString()).toString()}`)
        const parsed = await response.json()
        if (!parsed.data || !parsed.data.list) {
            return
        }
        if (parsed.data.list.length == 0) {
            return prevPulls
        }
        parsed.forEach((pull: HoyoPull) => {
            if (pull.item_id == lastId) {
                return prevPulls
            }
            prevPulls.unshift({
                userId: userId,
                uid: pull.uid,
                bannerId: pull.gacha_id,
                itemId: pull.item_id,
                timestamp: pull.time
            })
        })
        await new Promise(e => setTimeout(e, 3000))
        this.fetchPulls(userId, lastId, prevPulls)
    }

    async getUserHistory(userUid: UserUid): Promise<Array<Pull>> {
        return await this.pullService.getByUserUid(userUid)
    }

    async saveUserHistory(userId: number, authkey: string): Promise<void> {
        const uid = await this.userUidService.fetchUidByAuthkey(authkey)
        if (!uid) {
            //error with hoyo server
            return
        }
        this.data.hoyoParams['authkey'] = authkey
        const bannerTypes = [1, 11, 12]
        bannerTypes.forEach(async type => {
            this.data.hoyoParams['gacha_type'] = type
            const lastId = await this.pullService.getLastId({ userId: userId, uid: uid }, type)
            const pulls = await this.fetchPulls(userId, lastId)
            if (pulls) {
                await this.pullService.save(pulls)
            }
        })

    }
}
