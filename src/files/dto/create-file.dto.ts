import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
    @ApiProperty({example: 'profile', description: "Таблица, с которой связан файл"})
    readonly essenceTable: string;

    @ApiProperty({example: 4, description: "Номер сущности, которая использует файл"})
    readonly essenceID: number;
}