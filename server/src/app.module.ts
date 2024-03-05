import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullModule } from './pull/pull.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GameAccountModule } from './gameacc/gameacc.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { User } from './user/entity/user.entity';
import { GameAccount } from './gameacc/entity/gameacc.entity';
import { HelperModule } from './helper/helper.module';
import { AuthModule } from './auth/auth.module';
import jwt from './config/jwt';

@Module({
  imports: [
    PullModule,
    UserModule,
    AuthModule,
    GameAccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, jwt]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    HelperModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
