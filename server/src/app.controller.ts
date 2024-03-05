import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './user/dto/createUserDto';
import { UserService } from './user/user.service';
import { HelperService } from './helper/helper.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly helper: HelperService
  ) {}

  @Post('login')
  async login(@Body() body: { login: string, password: string }) {
      return this.authService.login(body);
  }

  @Post('signup')
    async createOne(@Body() createUserDto: CreateUserDto) {
      if (!createUserDto.login || !createUserDto.password) {
          throw new HttpException('no login or password provided', HttpStatus.BAD_REQUEST)
      }
      try {
          await this.userService.createOne(createUserDto)
          return { message: 'User created successfully' }
      } catch(error) {
          this.helper.throwServerError('User creation failed', error)
      }
    }

  @UseGuards(AuthGuard('jwt'))
  @Post('pulls')
  async savePulls(@Body('authkey') authkey: string, @Request() req) {
    if (!authkey) {
        throw new HttpException('no authkey specified', HttpStatus.BAD_REQUEST)
    }
    return await this.appService.savePulls(authkey, req.user)
  }
}
