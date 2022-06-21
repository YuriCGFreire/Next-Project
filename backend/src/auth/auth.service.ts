import { Injectable } from '@nestjs/common';
import { Users } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import {compareSync} from "bcrypt-nodejs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(name: any, password: string) {
        let user:Users
        try {
            user = await this.userService.findOneByName(name)
        } catch {
            return null
        }

        const isPasswordValid = compareSync(password, user.password)

        if(!isPasswordValid) return null

        return user
    }

    async login(user){
        const payload = {sub: user.id, name: user.name, age: user.age}

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
