import { CreateUserDto } from "./createUserDto";

export class UpdateUserDto implements Partial<CreateUserDto> {
    readonly id: number
    readonly username?: string
    readonly password?: string;
}