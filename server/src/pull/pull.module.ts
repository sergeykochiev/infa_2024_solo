import { Module } from '@nestjs/common';
import { PullService } from './pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PullSchema } from './entity/pull.entitySchema';
import { PullController } from './pull.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PullSchema]), UserModule],
  providers: [PullService],
  controllers: [PullController],
  exports: [PullService]
})
export class PullModule {}
