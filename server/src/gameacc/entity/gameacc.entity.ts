import { CreateGameAccountDto } from "../dto/createGameAccountDto"
import { User } from "src/user/entity/user.entity"

export class GameAccount {
    public id?: number
    public uid: number
    public user: User
    // will be added later
    // public type: 'public' | 'private' = 'private'

    constructor(createGameAccountDto?: CreateGameAccountDto) {
        if (!createGameAccountDto) {
            return
        }
        this.id = createGameAccountDto.id
        this.uid = createGameAccountDto.uid
        this.user = createGameAccountDto.user
    }
}