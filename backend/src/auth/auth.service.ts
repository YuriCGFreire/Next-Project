import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import {compareSync} from "bcrypt-nodejs"
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: any, password: string) {
        let user:Users
        try {
            user = await this.userService.findOneByEmail(email)
        } catch {
            return null
        }

        const isPasswordValid = compareSync(password, user.password)

        if(!isPasswordValid) return null

        return user
    }

    async login(user){
        const payload = {sub: user.id, name: user.name, email: user.email}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async signUp(createUserDTO: CreateUserDto) {
        return await this.userService.createUser(createUserDTO)
    }
}
