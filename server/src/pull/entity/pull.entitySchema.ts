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
            type: "timestamp"
        }
    },
    relations: {
        gameAccount: {
            type: 'many-to-one',
            target: 'GameAccount',
            cascade: true,
            onDelete: 'CASCADE'
        },
        item: {
            type: 'many-to-one',
            target: 'Item',
            eager: true,
        }
    }
})