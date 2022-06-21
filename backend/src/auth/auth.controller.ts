import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({summary: 'Realizar login do usuário'})
    @ApiResponse({
      status: 201,
      description: 'Login feito com sucesso'
    })
    async login(@Req() req: any){
        return this.authService.login(req.user)
    }

    @Post('signup')
    @ApiOperation({summary: 'Relizar o cadastro de usuário'})
    @ApiResponse({
      status: 204,
      description: 'Cadastro realizado com sucesso'
    })
    async signUp(@Body() body: CreateUserDto){
        return this.authService.signUp(body)
    }
}
