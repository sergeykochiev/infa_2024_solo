import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullModule } from './pull/pull.module';
import { PullService } from './pull/pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/entities/user.entitySchema';
import { PullSchema } from './pull/entities/pull.entitySchema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { GameAccountModule } from './gameacc/gameacc.module';
import { GameAccountSchema } from './gameacc/entities/gameacc.entitySchema';
import { GameAccountController } from './gameacc/gameacc.controller';
import { GameAccountService } from './gameacc/gameacc.service';

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
  ],
  controllers: [AppController, UserController, GameAccountController],
  providers: [AppService, UserService, PullService, GameAccountService],
})
export class AppModule {}
