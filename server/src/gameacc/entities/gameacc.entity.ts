import { Pull } from "src/pull/entities/pull.entity"

export class GameAccount {
    public id?: number
    public uid: number
    public pulls?: Pull[] = []
    // will be added later
    // public type: 'public' | 'private' = 'private'

    constructor(gameAccount: GameAccount) {
        this.id = gameAccount.id
        this.uid = gameAccount.uid
        this.pulls = gameAccount.pulls
    }
}