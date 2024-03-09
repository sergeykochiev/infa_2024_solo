import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import { PullService } from './pull.service';
import { AuthGuard } from '@nestjs/passport';
import { BannerType } from './entity/pull.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request as RequestType } from 'express';
import { User } from 'src/user/entity/user.entity';
import { Response as ResponseExpress, Request as RequestExpress } from 'express';

@Controller('pull')
export class PullController {
    constructor(private readonly pullService: PullService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':uid/:type')
    async getPulls(
        @Param('uid') uid: number,
        @Param('type') type: BannerType,
        @Request() request,
        @Response() response: ResponseExpress
    ) {
        response.status(HttpStatus.OK).json({ result: await this.pullService.getMany(uid, type, request.user.username) })
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async savePulls(@Body('hoyoUrl') hoyoUrl: string, @Request() request, @Response() response: ResponseExpress) {
        if (!hoyoUrl) {
            throw new HttpException('no url specified', HttpStatus.BAD_REQUEST)
        }
        const newPullsCount = await this.pullService.createMany(hoyoUrl, request.user.login)
        response.status(HttpStatus.CREATED).json({ result: newPullsCount })
    }
}
