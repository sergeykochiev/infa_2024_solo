import { GameAccount } from "src/gameacc/entities/gameacc.entity"

export class User {
    public id?: number
    public login: string
    public password: string
    public gameAccounts: Array<GameAccount> = []

    constructor(user: User) {
        this.id = user.id
        this.login = user.login
        this.gameAccounts = user.gameAccounts
    }
}