import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
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
  getUserById(@Param('id', new ParseUUIDPipe()) id){
    return this.userService.findOneOrFail(id)
  }

  @Patch(':id')
  updateUser(@Param('id', new ParseUUIDPipe()) id, @Body() updateUserDTO: UpdateUserDTO){
    return this.userService.updateUser(id, updateUserDTO)
  }

  @Delete("id")
  destroy(@Param('id', new ParseUUIDPipe()) id){
    return this.userService.destroy(id)
  }
}
