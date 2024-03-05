import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(login)
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, gameAccounts, ...result } = user
            return result
        }
        return null
    }

    async login(user: Partial<User>) {
        const payload = { username: user.login, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
