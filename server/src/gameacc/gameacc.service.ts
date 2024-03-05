import { Injectable } from '@nestjs/common';
import { GameAccount } from './entity/gameacc.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GameAccountService {
    constructor(
        private readonly userService: UserService
    ) {}

    async getMany(login: string): Promise<Array<GameAccount> | void> {
        const user = await this.userService.findOne(login)
        if (!user) {
            return
        }
        return user.gameAccounts
    }
}
