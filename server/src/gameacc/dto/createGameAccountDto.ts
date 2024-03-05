import { Pull } from "src/pull/entity/pull.entity"

export class CreateGameAccountDto {
    readonly id?: number
    readonly uid: number
    readonly pulls?: Array<Pull>
}