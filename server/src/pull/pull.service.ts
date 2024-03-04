import { Injectable } from '@nestjs/common';
import { Pull } from './pull';
import { UserUid } from 'src/uid/useruid';

@Injectable()
export class PullService {
    private readonly pulls: Array<Pull> = []

    async getByUserUid(userUid: UserUid): Promise<Array<Pull>> {
        return this.pulls.filter(pull => pull.uid == userUid.uid && pull.userId == userUid.userId)
    }

    async save(pulls: Array<Pull>): Promise<void> {
        this.pulls.concat(pulls)
    }

    async getLastId(userUid: UserUid, bannerId: number): Promise<number> {
        return this.pulls.find(pull => pull.uid == userUid.uid && pull.userId == userUid.userId && pull.bannerId == bannerId).itemId
    }
}
