import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PullService } from './pull.service';
import { AuthGuard } from '@nestjs/passport';
import { BannerType } from './entity/pull.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('pull')
export class PullController {
    constructor(private readonly pullService: PullService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':uid/:type')
    async getPulls(@Param('uid') uid: number, @Param('type') type: BannerType, @Request() request) {
        return this.pullService.getMany(uid, type, request.user.login)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async savePulls(@Body('authkey') authkey: string, @Request() req) {
        if (!authkey) {
            throw new HttpException('no authkey specified', HttpStatus.BAD_REQUEST)
        }
        return await this.pullService.createMany(authkey, req.user)
    }
}
