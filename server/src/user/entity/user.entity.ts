import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { CreateUserDto } from "../dto/createUserDto"

export class User {
    public id: number
    public login: string
    public password: string

    constructor(createUserDto?: CreateUserDto) {
        if (!createUserDto) {
            return
        }
        this.login = createUserDto.login
        this.password = createUserDto.password
    }
}