import { EntitySchema } from "typeorm";
import { GameAccount } from "./gameacc.entity";

export const GameAccountSchema = new EntitySchema<GameAccount>({
    name: 'GameAccount',
    target: GameAccount,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        uid: {
            type: Number,
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            eager: true
        },
    }
})