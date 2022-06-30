import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UpdateUserDTO {

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'juan@blabla.com'
    })
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Nome do usuário'
    })
    name?: string;

    @ApiProperty({
        description: 'Senha que deve contar letras maiúsculas, minusculas, carácteres especiais e números'
    })
    password: string;
}