import { Module } from '@nestjs/common';
import { UserUidController } from './useruid.controller';
import { UserUidService } from './useruid.service';

@Module({
  controllers: [UserUidController],
  providers: [UserUidService]
})
export class UserUidModule {}
