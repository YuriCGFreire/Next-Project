import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength} from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Juan'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Idade do usuário'
    })
    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
        message: "A senha deve contar letras maiúsculas, minúsculas, números e carácteres especiais."
    })
    @ApiProperty({
        description: 'Senha que deve contar letras maiúsculas, minusculas, carácteres especiais e números'
    })
    password: string;
}