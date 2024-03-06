import { CreateUserDto } from "./createUserDto";

export class UpdateUserDto implements Partial<CreateUserDto> {
    readonly id: number
    readonly login?: string
    readonly password?: string;
}