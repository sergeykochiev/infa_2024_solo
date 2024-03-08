import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { CreateUserDto } from "../dto/createUserDto"

export class User {
    public id: number
    public username: string
    public password: string

    constructor(createUserDto?: CreateUserDto) {
        if (!createUserDto) {
            return
        }
        this.username = createUserDto.username
        this.password = createUserDto.password
    }
}