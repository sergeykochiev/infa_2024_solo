import { Controller, Get } from '@nestjs/common';
import { BannerService } from 'src/banner/banner.service';
import { GameAccountService } from 'src/gameacc/gameacc.service';
import { ItemService } from 'src/item/item.service';
import { PullService } from 'src/pull/pull.service';
import { UserService } from 'src/user/user.service';

@Controller('test')
export class TestController {
    constructor(
        private readonly userService: UserService,
        private readonly gameAccountService: GameAccountService,
        private readonly pullService: PullService,
        private readonly itemService: ItemService,
        private readonly bannerService: BannerService
    ) {}

    @Get('users')
    async getUsers() {
        return { result: await this.userService.getAll() }
    }

    @Get('gameaccs')
    async getGameaccs() {
        return { result: await this.gameAccountService.getAll() }
    }

    @Get('pulls')
    async getPulls() {
        return { result: await this.pullService.getAll() }
    }

    @Get('items')
    async getItems() {
        return { result: await this.itemService.getAll() }
    }

    @Get('banners')
    async getBanners() {
        return { result: await this.bannerService.getAll() }
    }
}
