import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/user.entity';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Response as ResponseType, Request as RequestType } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request: RequestType, @Response() response: ResponseType) {
        const jwt = await this.authService.login(request.user)
        response.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: true
        })
        response.send({ message: 'Login successful' })
    }
}
