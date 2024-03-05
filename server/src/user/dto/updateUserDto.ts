import { GameAccount } from "src/gameacc/entity/gameacc.entity";
import { CreateUserDto } from "./createUserDto";

export class UpdateUserDto implements Partial<CreateUserDto> {
    readonly id: number
    readonly login?: string
    readonly password?: string;
    readonly gameAccounts?: Array<GameAccount>
}