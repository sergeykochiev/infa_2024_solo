import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PullService } from './pull/pull.service';
import { GameAccountService } from './gameacc/gameacc.service';
import { SavePullsDto } from './dto/savePullsDto';
import { BannerType } from './pull/entities/pull.entity';
import { GameAccount } from './gameacc/entities/gameacc.entity';
import { fetchData } from './const';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly pullService: PullService,
    private readonly gameAccountService: GameAccountService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

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

  async savePulls(savePullsDto: SavePullsDto): Promise<void> {
    const user = await this.userService.findOne(savePullsDto.login)
    if (!user) {
      return
    }
    const uid = await this.fetchUidByAuthkey(savePullsDto.authkey)
    if (!uid) {
      //error with hoyo server
      return
    }
    let gameAcc = user.gameAccounts.find(gameAcc => gameAcc.uid == uid)
    const params = { ...fetchData.hoyoParams,
      'authkey': savePullsDto.authkey,
      'gacha_type': null
    }
    const bannerTypes: Array<BannerType> = [1, 11, 12]
    const pulls = []
    bannerTypes.forEach(async type => {
        params.gacha_type = type
        let lastId: number | null
        if (gameAcc) {
            const pulls = await this.gameAccountService.getPulls(gameAcc.id, type)
            if (pulls.length > 0) {
                lastId = pulls[0].id
            }
        }
        pulls.concat(await this.pullService.fetchPulls(lastId, params))
    })
    user.gameAccounts.push(new GameAccount({
      id: gameAcc ? gameAcc.id : null,
      uid: uid,
      pulls: pulls
    }))
    await this.userService.saveOne(user)
  }
}
