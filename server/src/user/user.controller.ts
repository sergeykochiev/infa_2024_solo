import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    
    @Get(':id')
    async getGameAccounts(@Param('id') id: number) {
        return this.userService.getGameAccounts(id)
    }
}
