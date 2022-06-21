import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Juan'
    })
    name?: string;

    @ApiProperty({
        description: 'Idade do usuário'
    })
    age?: number;

    @ApiProperty({
        description: 'Senha que deve contar letras maiúsculas, minusculas, carácteres especiais e números'
    })
    password: string;
}