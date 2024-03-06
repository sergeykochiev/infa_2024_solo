import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { HelperService } from 'src/helper/helper.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly helper: HelperService
    ) {}

    @Post('signup')
    async createOne(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.login || !createUserDto.password) {
            throw new HttpException('no login or password provided', HttpStatus.BAD_REQUEST)
        }
        try {
            await this.userService.createOne(createUserDto)
            return { message: 'User created successfully' }
        } catch(error) {
            console.log(error)
            this.helper.throwServerError('User creation failed', error)
        }
    }
}
