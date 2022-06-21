import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any){
        return this.authService.login(req.user)
    }

    @Post('signup')
    async signUp(@Body() body: CreateUserDto){
        return this.authService.signUp(body)
    }
}
