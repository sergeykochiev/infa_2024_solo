import { Controller, Get, HttpStatus, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request as ExpressRequest, Response as ExpressResponse } from "express"

@Controller('user')
export class UserController {
    constructor() {}

    @UseGuards(JwtAuthGuard)
    @Get('current')
    async getCurrent(@Request() request: ExpressRequest, @Response() response: ExpressResponse ) {
        response.status(HttpStatus.CREATED).json({ result: request.user })
    }
}
