import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
            const user = this.usersRepository.create(createUserDTO)
            return this.usersRepository.save(user)
        }catch{

        }
    }
}
