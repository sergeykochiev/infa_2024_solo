import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullModule } from './pull/pull.module';
import { PullService } from './pull/pull.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/entity/user.entitySchema';
import { PullSchema } from './pull/entity/pull.entitySchema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { GameAccountModule } from './gameacc/gameacc.module';
import { GameAccountSchema } from './gameacc/entity/gameacc.entitySchema';
import { GameAccountController } from './gameacc/gameacc.controller';
import { GameAccountService } from './gameacc/gameacc.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { User } from './user/entity/user.entity';
import { GameAccount } from './gameacc/entity/gameacc.entity';

@Module({
  imports: [
    PullModule,
    UserModule,
    GameAccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature([User, GameAccount])
  ],
  controllers: [AppController, UserController, GameAccountController],
  providers: [AppService, UserService, PullService, GameAccountService],
})
export class AppModule {}
