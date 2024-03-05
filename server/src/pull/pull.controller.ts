import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { PullService } from './pull.service';
import { AuthGuard } from '@nestjs/passport';
import { BannerType } from './entity/pull.entity';
import { Request as RequestType } from 'express';

@Controller('pull')
export class PullController {
    constructor(private readonly pullService: PullService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':uid/:type')
    async getPulls(@Param('uid') uid: number, @Param('type') type: BannerType, @Request() request) {
        return this.pullService.getMany(uid, type, request.user.login)
    }
}
