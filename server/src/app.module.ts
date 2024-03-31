import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PullModule } from './pull/pull.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GameAccountModule } from './gameacc/gameacc.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { HelperModule } from './helper/helper.module';
import { AuthModule } from './auth/auth.module';
import jwt from './config/jwt';
import { TestModule } from './test/test.module';
import { ItemModule } from './item/item.module';
import { BannerModule } from './banner/banner.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes('')
  }
}
