import { Module } from '@nestjs/common';
import { GameAccountController } from './gameacc.controller';
import { GameAccountService } from './gameacc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameAccountSchema } from './entity/gameacc.entitySchema';

@Module({
  imports: [TypeOrmModule.forFeature([GameAccountSchema])],
  controllers: [GameAccountController],
  providers: [GameAccountService]
})
export class GameAccountModule {}
