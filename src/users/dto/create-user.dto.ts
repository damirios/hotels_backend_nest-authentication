import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'leon@kennedi.com', description: "Электронная почта"})
    readonly email: string;
    
    @ApiProperty({example: 'qwerty12', description: "Пароль"})
    readonly password: string;
}