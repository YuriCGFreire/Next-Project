import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository:Repository<Users>
    ){}

    async createAccessToken(userId: string):Promise<String>{
        return sign({userId}, 'segredo', {
            expiresIn: '72h'
        })
    }

    async validateUser(jwtPayload: JwtPayload){
        const user = await this.usersRepository.findOne({
            where: {id: jwtPayload.userId}
        })
        return {
            id: user.id,
            name: user.name,
            admin: user.admin
        }
    }
}
