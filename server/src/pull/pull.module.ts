import { Module } from '@nestjs/common';
import { PullService } from './pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PullSchema } from './entity/pull.entitySchema';

@Module({
  imports: [TypeOrmModule.forFeature([PullSchema])],
  providers: [PullService],
})
export class PullModule {}
