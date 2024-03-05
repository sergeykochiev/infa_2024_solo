import { EntitySchema } from "typeorm";
import { User } from "./user.entity";

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        login: {
            type: String,
            unique: true
        },
        password: {
            type: String,
        }
    },
    relations: {
        gameAccounts: {
            type: 'one-to-many',
            target: 'GameAccount',
            cascade: true
        }
    }
})