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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PullController } from './pull/pull.controller';
import { GameAccountController } from './gameacc/gameacc.controller';
import { PullService } from './pull/pull.service';
import { GameAccountService } from './gameacc/gameacc.service';
import { TestModule } from './test/test.module';
import { ItemModule } from './item/item.module';
import { BannerModule } from './banner/banner.module';

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
    TestModule,
    ItemModule,
    BannerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
