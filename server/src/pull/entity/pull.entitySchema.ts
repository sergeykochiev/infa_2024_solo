import { EntitySchema } from "typeorm";
import { BannerType, Pull } from "./pull.entity";
import { BigInt } from "postgres";

export const PullSchema = new EntitySchema<Pull>({
    name: 'Pull',
    target: Pull,
    columns: {
        id: {
            type: 'bigint',
            primary: true,
        },
        timestamp: {
            type: "timestamp"
        }
    },
    relations: {
        gameAccount: {
            type: 'many-to-one',
            target: 'GameAccount',
            onDelete: 'CASCADE'
        },
        item: {
            type: 'many-to-one',
            target: 'Item',
            cascade: true,
            eager: true,
        },
        banner: {
            type: 'many-to-one',
            target: 'Banner',
            cascade: true,
            eager: true,
        }
    }
})