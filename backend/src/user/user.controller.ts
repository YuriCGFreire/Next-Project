import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { UpdateUserSwagger } from './swagger/update-user.swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
export class UserController { 
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({summary: 'Listar todos os usuários'})
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornado com sucesso',
    type: IndexUserSwagger,
    isArray: true
  })
  async getUsers(){
    return await this.userService.getUsers()
  }

  @Get(':id')
  @ApiOperation({summary: 'Buscar usuário pelo id'})
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado com sucesso',
    type: IndexUserSwagger
  })
  async getUserById(@Param('id', new ParseUUIDPipe()) id:string){
    return await this.userService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: 'Atualizar dados do usuário'})
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UpdateUserSwagger
  })
  async updateUser(@Param('id', new ParseUUIDPipe()) id, @Body() updateUserDTO: UpdateUserDTO){
    return await this.userService.updateUser(id, updateUserDTO)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Deletar usuário'})
  @ApiResponse({
    status: 204,
    description: 'Usuário deletado com sucesso'
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id, @Body('password') password: string){
    return await this.userService.destroy(id, password)
  }
}
