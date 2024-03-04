import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { UserUid } from 'src/uid/useruid';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get()
    async getUserHistory(@Body() userUid: UserUid) {
        return this.historyService.getUserHistory(userUid)
    }

    @Post()
    async saveUserHistory(@Body() userId: number, authkey: string) {
        return await this.historyService.saveUserHistory(userId, authkey)
    }


}
