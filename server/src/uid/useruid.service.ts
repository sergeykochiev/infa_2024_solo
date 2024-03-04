import { Injectable } from '@nestjs/common';
import { UserUid } from './useruid';

@Injectable()
export class UserUidService {
    private readonly UsersUids: Array<UserUid> = []

    private readonly data = {
        hoyoUrl: 'https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog',
        hoyoParams: {
            'lang': 'en',
            'authkey_ver': 1,
            'size': 20,
            'game_biz': 'hkrpg_global',
        }
    }

    async getAllUidsByUser(userId: number): Promise<Array<UserUid> | void> {
        return this.UsersUids.filter(userUid => userUid.userId == userId)
    }

    async addUserUid(userUid: UserUid): Promise<void> {
        this.UsersUids.push(userUid)
    }

    async dropUserUid(userUid: UserUid): Promise<void> {
        const idx = this.UsersUids.findIndex(e => e.userId == userUid.userId && e.uid == userUid.uid)
        this.UsersUids.splice(idx, 1)
        //drop pulls with the userUid.uid and userUid.userId from DB
    }

    async fetchUidByAuthkey(authkey: string): Promise<number | void> {
        this.data.hoyoParams.size = 1
        this.data.hoyoParams['gacha_type'] = 1
        this.data.hoyoParams['authkey'] = authkey
        const response = await fetch(`${this.data.hoyoUrl}/?${new URLSearchParams(this.data.hoyoParams.toString()).toString()}`)
        const parsed = await response.json()
        if (parsed.data && parsed.data.list && parsed.data.list.length > 0 && parsed.data.list[0].uid) {
            return parsed.data.list[0].uid
        }
    }
}
