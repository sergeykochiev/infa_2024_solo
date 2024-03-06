import { User } from "src/user/entity/user.entity"

export class CreateGameAccountDto {
    readonly id?: number
    readonly uid: number
    readonly user: User
}