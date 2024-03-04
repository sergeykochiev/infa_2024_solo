import { GameAccount } from "src/gameacc/entities/gameacc.entity"

export class CreateUserDto {
    public id?: number
    public login: string
    public gameAccounts?: Array<GameAccount>
}