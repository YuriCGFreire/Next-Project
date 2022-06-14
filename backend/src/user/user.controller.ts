import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data)
  }

  @Get()
  getUsers(){
    return this.userService.getUsers()
  }

  @Get(':id')
  getUserById(@Param('id') id:string){
    return this.userService.getUserById(id)
  }

  @Patch(':id')
  updateUser(@Param('id') id:string, @Body() updateUserDTO: UpdateUserDTO){
    return this.userService.updateUser(id, updateUserDTO)
  }
}
