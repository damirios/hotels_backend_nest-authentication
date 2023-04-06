import { ApiProperty } from "@nestjs/swagger";

export class CreateTextBlockDto {
    @ApiProperty({example: 'main-hero-text', description: "Уникальное название текстового блока"})
    readonly uniqueName: string;
    
    @ApiProperty({example: 'Привет!', description: "Заголовок текстового блока"})
    readonly title: string;

    @ApiProperty({example: 'Лонгрид по какой-либо крутой штуке', description: "Содержимое текстового блока"})
    readonly text: string;
}