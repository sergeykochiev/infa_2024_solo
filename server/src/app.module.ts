import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullModule } from './pull/pull.module';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { HistoryModule } from './history/history.module';
import { UserUidModule } from './uid/useruid.module';
import { UserUidController } from './uid/useruid.controller';
import { UserUidService } from './uid/useruid.service';
import { PullService } from './pull/pull.service';

@Module({
  imports: [HistoryModule, PullModule, UserUidModule],
  controllers: [AppController, HistoryController, UserUidController],
  providers: [AppService, HistoryService, UserUidService, PullService],
})
export class AppModule {}
