import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(login: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(login)
        if (!user) {
            return
        }
        if (!bcrypt.compare(pass, user.password)) {
            throw UnauthorizedException
        }
        const payload = { sub: user.id, login: user.login }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
