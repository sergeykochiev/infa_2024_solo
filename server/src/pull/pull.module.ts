import { Module } from '@nestjs/common';
import { PullService } from './pull.service';

@Module({
  providers: [PullService]
})
export class PullModule {}
