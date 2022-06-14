import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
                "User Already Exists",
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
        return this.usersRepository.find()
    }

    async getUserById(id: string) {
        console.log(typeof id)
        const user = await this.usersRepository.findOne({
            select: ['id', 'admin', 'name', 'age', 'created_at', 'deleted_at', 'updated_at'],
            where: { id: id }
        })
        return user
        
    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
        const user = await this.usersRepository.findOne({
            select: ['id', 'admin', 'age', 'created_at', 'deleted_at', 'updated_at', 'password'],
            where: {id: id}
        })

        console.log("id", id)

        if (!updateUserDTO.password) {
            throw new HttpException(
                "Senha não informada.",
                HttpStatus.BAD_REQUEST
            )
        }

        const passwordsMatch = await compareSync(updateUserDTO.password, user.password)
        console.log(passwordsMatch)

        if (!passwordsMatch) {
            throw new HttpException(
                "Senha inválida",
                HttpStatus.BAD_REQUEST
            )
        } else {
            const updatedUser = await this.usersRepository.preload({
                id: id,
                ...updateUserDTO
            })
            console.log(updatedUser)
            return this.usersRepository.save(updatedUser)
        }

    }

}
