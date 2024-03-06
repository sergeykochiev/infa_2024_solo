import { EntitySchema } from "typeorm";
import { Pull } from "./pull.entity";

export const PullSchema = new EntitySchema<Pull>({
    name: 'Pull',
    target: Pull,
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        bannerId: {
            type: Number,
        },
        itemId: {
            type: Number,
        },
        timestamp: {
            type: Date
        }
    },
    relations: {
        gameAccount: {
            type: 'many-to-one',
            target: 'GameAccount',
            eager: true
        }
    }
})