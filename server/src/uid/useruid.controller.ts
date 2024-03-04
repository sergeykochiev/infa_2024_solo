import { Body, Controller, Get } from '@nestjs/common';
import { UserUidService } from './useruid.service';

@Controller('uid')
export class UserUidController {
    constructor(private readonly userUidService: UserUidService) {}

    @Get('all')
    async getAllUidsByUser(@Body() userId: number) {
        return this.userUidService.getAllUidsByUser(userId)
    }
}
