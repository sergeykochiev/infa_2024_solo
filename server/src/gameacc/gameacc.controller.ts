import { Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { GameAccountService } from './gameacc.service';
import { BannerType } from 'src/pull/entity/pull.entity';

@Controller('uid')
export class GameAccountController {
    constructor(private readonly gameAccountService: GameAccountService) {}

    @Get(':id')
    async getPulls(@Param('id') id: number, @Query('type') type: BannerType) {
        return this.gameAccountService.getPulls(id, type)
    }
}
