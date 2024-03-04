import { Module } from '@nestjs/common';
import { PullService } from './pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pull } from './entities/pull.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pull])],
  providers: [PullService],
})
export class PullModule {}
