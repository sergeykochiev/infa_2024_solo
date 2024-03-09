import { Controller, Delete, Get, HttpStatus, Query, Request, Response, UseGuards } from '@nestjs/common';
import { GameAccountService } from './gameacc.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Response as ResponseExpress, Request as RequestExpress } from 'express';

@Controller('gameacc')
export class GameAccountController {
    constructor(private readonly gameAccountService: GameAccountService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMany(@Request() request, @Response() response: ResponseExpress) {
        response.status(HttpStatus.OK).json({ result: await this.gameAccountService.findMany(request.user.username) })
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteOne(@Query('uid') uid: number, @Request() request, @Response() response: ResponseExpress) {
        await this.gameAccountService.deleteOne(uid, request.user.username)
        response.status(HttpStatus.OK)
    }
}
