import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { Rarity } from '../types/rarity.type';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    readonly id?: number;
    readonly name?: string;
    readonly rarity?: Rarity;
}
