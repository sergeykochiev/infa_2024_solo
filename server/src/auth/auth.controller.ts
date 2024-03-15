import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Request, Response, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/user.entity';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Response as ResponseExpress, Request as RequestExpress } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/createUserDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request: RequestExpress, @Response() response: ResponseExpress) {
        const jwt = await this.authService.login(request.user)
        response.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: true
        })
        response.status(HttpStatus.OK).json({ result: request.user })
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Response() response: ResponseExpress) {
        response.clearCookie('jwt')
        response.status(HttpStatus.OK).send()
    }

    @UseGuards(JwtAuthGuard)
    @Get('login')
    async initLogin(@Request() request: RequestExpress, @Response() response: ResponseExpress) {  
        response.status(HttpStatus.OK).json({ result: request.user })
    }

    @Post('signup')
    async singup(@Body() createUserDto: CreateUserDto, @Response() response: ResponseExpress) {
        console.log(createUserDto.username)
        await this.authService.signup(createUserDto)
        response.status(HttpStatus.CREATED).send()
    }
}
