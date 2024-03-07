import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GameAccountService } from './gameacc.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('gameacc')
export class GameAccountController {
    constructor(private readonly gameAccountService: GameAccountService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMany(@Request() request) {
        return { result: await this.gameAccountService.findMany(request.user.login) }
    }
}
