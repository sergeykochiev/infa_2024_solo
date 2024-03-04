import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signInDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.login, signInDto.password);
  }
}
