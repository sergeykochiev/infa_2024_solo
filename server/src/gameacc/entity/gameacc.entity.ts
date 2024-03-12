import { CreateGameAccountDto } from "../dto/createGameAccountDto"
import { User } from "src/user/entity/user.entity"

export class GameAccount {
    constructor(
        public uid: number,
        public user: User,
        public id?: number
    ) {}
    // will be added later
    // public type: 'public' | 'private' = 'private'
}