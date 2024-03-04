import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SavePullsDto } from './dto/savePullsDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async savePulls(@Body() savePullsDto: SavePullsDto) {
      if (!savePullsDto.login) {
          throw new HttpException('no login specified', HttpStatus.BAD_REQUEST)
      }
      if (!savePullsDto.authkey) {
          throw new HttpException('no authkey specified', HttpStatus.BAD_REQUEST)
      }
      return await this.appService.savePulls(savePullsDto)
  }
}
