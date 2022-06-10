import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
}
