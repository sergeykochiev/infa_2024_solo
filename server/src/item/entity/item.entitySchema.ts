import { EntitySchema } from "typeorm";
import { Item } from "./item.entity";

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
            type: String
        },
        rank: {
            type: Number
        }
    }
})