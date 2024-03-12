import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UserModule } from 'src/user/user.module';
import { GameAccountModule } from 'src/gameacc/gameacc.module';
import { PullModule } from 'src/pull/pull.module';
import { ItemModule } from 'src/item/item.module';
import { BannerModule } from 'src/banner/banner.module';

@Module({
  imports: [UserModule, GameAccountModule, PullModule, ItemModule, BannerModule],
  controllers: [TestController]
})
export class TestModule {}
