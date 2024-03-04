import { Module } from '@nestjs/common';
import { GameAccountController } from './gameacc.controller';
import { GameAccountService } from './gameacc.service';

@Module({
  controllers: [GameAccountController],
  providers: [GameAccountService]
})
export class GameAccountModule {}
