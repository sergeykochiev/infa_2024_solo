import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/createUserDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<Partial<User> | null> {
        console.log(1)
        const user = await this.userService.findOne(username)
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: Partial<User>) {
        const payload = { username: user.username, sub: user.id }
        return this.jwtService.sign(payload)
    }

    async signup(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { password, ...user } = await this.userService.createOne(createUserDto)
        return user
    }
}
