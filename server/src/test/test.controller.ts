import { Controller, Get } from '@nestjs/common';
import { GameAccountService } from 'src/gameacc/gameacc.service';
import { PullService } from 'src/pull/pull.service';
import { UserService } from 'src/user/user.service';

@Controller('test')
export class TestController {
    constructor(
        private readonly userService: UserService,
        private readonly gameAccountService: GameAccountService,
        private readonly pullService: PullService
    ) {}

    @Get('users')
    async getUsers() {
        return await this.userService.getAll()
    }

    @Get('gameaccs')
    async getGameaccs() {
        return await this.gameAccountService.getAll()
    }

    @Get('pulls')
    async getPulls() {
        return await this.pullService.getAll()
    }

}
