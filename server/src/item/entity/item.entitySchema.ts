import { EntitySchema, ManyToMany } from "typeorm";
import { Item, ItemType, RankType } from "./item.entity";

export const ItemSchema = new EntitySchema<Item>({
    name: 'Item',
    target: Item,
    columns: {
        id: {
            type: Number,
            primary: true
        },
        name: {
            type: String
        },
        type: {
            type: 'enum',
            enum: ItemType
        },
        rank: {
            type: 'enum',
            enum: RankType
        }
    },  
    relations: {
        banners: {
            type: 'many-to-many',
            target: 'Banner',
            joinTable: true,
            eager: true,
            nullable: true
        }
    }
})