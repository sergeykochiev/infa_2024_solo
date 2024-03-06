import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UserModule } from 'src/user/user.module';
import { GameAccountModule } from 'src/gameacc/gameacc.module';
import { PullModule } from 'src/pull/pull.module';

@Module({
  imports: [UserModule, GameAccountModule, PullModule],
  controllers: [TestController]
})
export class TestModule {}
