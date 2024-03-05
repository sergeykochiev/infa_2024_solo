import { Pull } from "src/pull/entity/pull.entity"
import { CreateGameAccountDto } from "../dto/createGameAccountDto"

export class GameAccount {
    public id?: number
    public uid: number
    public pulls: Array<Pull>
    // will be added later
    // public type: 'public' | 'private' = 'private'

    constructor(createGameAccountDto?: CreateGameAccountDto) {
        if (!createGameAccountDto) {
            return
        }
        this.id = createGameAccountDto.id
        this.uid = createGameAccountDto.uid
        this.pulls = createGameAccountDto.pulls
    }
}