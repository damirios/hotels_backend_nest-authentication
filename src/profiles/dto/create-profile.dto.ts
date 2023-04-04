import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
    @ApiProperty({example: 'Индиана', description: "Имя пользователя"})
    readonly firstName: string;

    @ApiProperty({example: 'Джонс', description: "Фамилия пользователя"})
    readonly lastName: string;

    @ApiProperty({example: '+123456789', description: "Номер телефона"})
    readonly phone: string;

    @ApiProperty({example: 'г. Аркадия Бэй', description: "Адрес пользователя"})
    readonly address: string;

    @ApiProperty({example: '3', description: "Внешний ключ для таблицы user"})
    readonly userID: number;
}