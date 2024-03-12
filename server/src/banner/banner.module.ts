import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerSchema } from './entity/banner.entitySchema';

@Module({
  imports: [TypeOrmModule.forFeature([BannerSchema])],
  providers: [BannerService],
  exports: [BannerService]
})
export class BannerModule {}
