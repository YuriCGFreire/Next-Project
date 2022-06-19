import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data)
  }

  @Get()
  async getUsers(){
    return await this.userService.getUsers()
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id:string){
    console.log(typeof id)
    return await this.userService.findOne(id)
  }

  @Patch(':id')
  async updateUser(@Param('id', new ParseUUIDPipe()) id, @Body() updateUserDTO: UpdateUserDTO){
    return await this.userService.updateUser(id, updateUserDTO)
  }

  @Delete("id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id){
    return await this.userService.destroy(id)
  }
}
