import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository:Repository<Users>
    ){}

    public async createAccessToken(userId: string):Promise<String>{
        return sign({userId}, 'segredo', {
            expiresIn: '72h'
        })
    }
}
