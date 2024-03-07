import { EntitySchema } from "typeorm";
import { Pull } from "./pull.entity";
import { BigInt } from "postgres";

export const PullSchema = new EntitySchema<Pull>({
    name: 'Pull',
    target: Pull,
    columns: {
        id: {
            type: 'bigint',
            primary: true,
        },
        bannerId: {
            type: Number,
        },
        bannerType: {
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
        },
        item: {
            type: 'many-to-one',
            target: 'Item',
            cascade: true,
            eager: true
        }
    }
})