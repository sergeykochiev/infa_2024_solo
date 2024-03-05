import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GameAccountService } from './gameacc.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('gameacc')
export class GameAccountController {
    constructor(private readonly gameAccountService: GameAccountService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getMany(@Request() request) {
        return this.gameAccountService.getMany(request.user.login)
    }
}
