import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemSchema } from './entity/item.entitySchema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemSchema])],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
