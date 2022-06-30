import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync } from "bcrypt-nodejs"
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
            where: { email: createUserDTO.email }
        })

        if (user) {
            throw new HttpException(
                "Usuário já existe",
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const user = this.usersRepository.create(createUserDTO)
            await this.usersRepository.save(user)
            return this.usersRepository.findOne({
                where: { id: user.id },
                select: ['name', 'email', 'id', 'created_at', 'deleted_at', 'created_at', 'updated_at']
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
            select: ['id', 'name', 'email', 'created_at', 'deleted_at', 'updated_at'],
        })
    }

    async findOne(id: string) {
        try {
            return await this.usersRepository.findOneOrFail({
                where: { id },
                select: ['id', 'name', 'email', 'created_at', 'deleted_at', 'updated_at']
            })
        } catch (err) {
            throw new HttpException(
                "Usuário não encontrado.",
                HttpStatus.NOT_FOUND
            )
        }
    }

    async findOneByEmail(email: string){
        try {
            return await this.usersRepository.findOneOrFail({
                where: { email: email }
            })
        } catch (err) {
            throw new HttpException(
                "Usuário não encontrado.",
                HttpStatus.NOT_FOUND
            )
        }   
    }

    async updateUser(id: any, updateUserDTO: UpdateUserDTO) {
        const user = await this.findOne(id)

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

    async destroy(id: any, password: string) {
        const user = await this.usersRepository.findOne({
            where: {id: id}
        })

        console.log(user)

        const passwordsMatch = await compareSync(password, user.password)

        if (!passwordsMatch) {
            throw new HttpException(
                "Senha inválida",
                HttpStatus.BAD_REQUEST
            )
        } else {
            return await this.usersRepository.delete(id)
        }
    }
}
