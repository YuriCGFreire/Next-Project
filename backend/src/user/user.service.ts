import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from "bcrypt-nodejs"
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) { }

    async createUser(createUserDTO: CreateUserDto) {

        const user = await this.usersRepository.findOne({
            where: { name: createUserDTO.name }
        })

        if (user) {
            throw new HttpException(
                "Usuário já existe",
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const encrypPassword = (password: string) => {
                const salt = genSaltSync(10)
                return hashSync(password, salt)
            }
            const user = this.usersRepository.create(createUserDTO)
            user.password = encrypPassword(user.password)
            await this.usersRepository.save(user)
            return this.usersRepository.findOne({
                where: { id: user.id }
            })
        } catch (err) {
            throw new HttpException(
                err.message,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getUsers() {
        return this.usersRepository.find({
            select: ['id', 'admin', 'name', 'age', 'created_at', 'deleted_at', 'updated_at'],
        })
    } 
    
    async findOneOrFail(options: FindOneOptions<Users>){
        try{
            return await this.usersRepository.findOneOrFail(options)
        }catch(err){
            throw new HttpException (
                "Usuário não encontrado.",
                HttpStatus.NOT_FOUND
            )
        }   
    }

    async updateUser(id: any, updateUserDTO: UpdateUserDTO) {
        const user = await this.findOneOrFail(id)

        if (!updateUserDTO.password) {
            throw new HttpException(
                "Senha não informada.",
                HttpStatus.BAD_REQUEST
            )
        }

        const passwordsMatch = await compareSync(updateUserDTO.password, user.password)

        if (!passwordsMatch) {
            throw new HttpException(
                "Senha inválida",
                HttpStatus.BAD_REQUEST
            )
        } else {
            this.usersRepository.merge(user, updateUserDTO)
            return await this.usersRepository.save(user)
        }

    }

    async destroy(id:any){
        await this.usersRepository.findOneOrFail(id)
        this.usersRepository.softDelete(id)
    }
}
