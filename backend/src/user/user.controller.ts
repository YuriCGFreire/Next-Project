import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController { 
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(){
    return await this.userService.getUsers()
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id:string){
    return await this.userService.findOne(id)
  }

  @Patch(':id')
  async updateUser(@Param('id', new ParseUUIDPipe()) id, @Body() updateUserDTO: UpdateUserDTO){
    return await this.userService.updateUser(id, updateUserDTO)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id, @Body('password') password: string){
    return await this.userService.destroy(id, password)
  }
}
