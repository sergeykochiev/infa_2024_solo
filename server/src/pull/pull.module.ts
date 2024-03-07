import { Module } from '@nestjs/common';
import { PullService } from './pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PullSchema } from './entity/pull.entitySchema';
import { PullController } from './pull.controller';
import { UserModule } from 'src/user/user.module';
import { GameAccountModule } from 'src/gameacc/gameacc.module';
import { HelperModule } from 'src/helper/helper.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PullSchema]),
    UserModule,
    GameAccountModule,
    HelperModule,
    ItemModule
  ],
  providers: [PullService],
  exports: [PullService],
  controllers: [PullController],
})
export class PullModule {}
