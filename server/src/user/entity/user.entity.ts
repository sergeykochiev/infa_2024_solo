import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { CreateUserDto } from "../dto/createUserDto"

export class User {
    public id: number
    public login: string
    public password: string
    public gameAccounts: Array<GameAccount>

    constructor(createUserDto?: CreateUserDto) {
        if (!createUserDto) {
            return
        }
        this.id = createUserDto.id
        this.login = createUserDto.login
        this.password = createUserDto.password
        this.gameAccounts = createUserDto.gameAccounts
    }
}