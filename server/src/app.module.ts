import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullModule } from './pull/pull.module';
import { PullService } from './pull/pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/entities/user.entitySchema';
import { PullSchema } from './pull/entities/pull.entitySchema';
import { GameAccountSchema } from './uid/entities/gameacc.entitySchema';
import { UserController } from './user/user.controller';
import { PullController } from './pull/pull.controller';
import { UserService } from './user/user.service';
import { GameAccountController } from './uid/gameacc.controller';
import { GameAccountService } from './uid/gameacc.service';
import { GameAccountModule } from './uid/gameacc.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PullModule,
    UserModule,
    GameAccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5000,
      username: 'root',
      password: 'hdqw987dyqwbr2',
      database: 'test',
      entities: [UserSchema, PullSchema, GameAccountSchema],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, UserController, PullController, GameAccountController],
  providers: [AppService, UserService, PullService, GameAccountService],
})
export class AppModule {}
