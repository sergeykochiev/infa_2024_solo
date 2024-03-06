import { Module } from '@nestjs/common';
import { PullService } from './pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PullSchema } from './entity/pull.entitySchema';
import { PullController } from './pull.controller';
import { UserModule } from 'src/user/user.module';
import { GameAccountModule } from 'src/gameacc/gameacc.module';

@Module({
  imports: [TypeOrmModule.forFeature([PullSchema]), UserModule, GameAccountModule],
  providers: [PullService],
  exports: [PullService],
  controllers: [PullController],
})
export class PullModule {}
