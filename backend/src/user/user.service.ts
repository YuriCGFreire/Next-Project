import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {genSaltSync, hashSync} from "bcrypt-nodejs"
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ){ }

    async createUser(createUserDTO: CreateUserDto){

        const user = await this.usersRepository.findOne({
            where: { name: createUserDTO.name }
        })
        
        if(user){
            throw new HttpException(
                "User Already Exists",
                HttpStatus.BAD_REQUEST
            )
        }

        try{
            const encrypPassword = (password: string) => {
                const salt = genSaltSync(10)
                return hashSync(password, salt)
            }
            const user = this.usersRepository.create(createUserDTO)
            user.password = encrypPassword(user.password)
            await this.usersRepository.save(user)
            return this.usersRepository.findOne({
                where: {id: user.id}
            })
        }catch(err){
            throw new HttpException(
                err.message,
                HttpStatus.BAD_REQUEST
            )
        }
    }
    
}
