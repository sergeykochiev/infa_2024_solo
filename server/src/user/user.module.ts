import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './entity/user.entitySchema';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), HelperModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
