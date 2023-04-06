import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// описываем поля, которые нужны для создания объекта класса File (в БД)
interface FileModelCreationAttributes {
    fileName: string;
}

@Table({tableName: 'file'})
export class FileModel extends Model<FileModel, FileModelCreationAttributes> {
    @ApiProperty({example: 3, description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'dfs423-asdfsd3-fdsfs32.jpg', description: "Уникальное название картинки (генерируем сами)"})
    @Column({type: DataType.STRING, allowNull: false})
    fileName: string;

    @ApiProperty({example: 'profile', description: "Таблица, где используется картинка"})
    @Column({type: DataType.STRING})
    essenceTable: string;

    @ApiProperty({example: 16, description: "ID сущности, которая использует картинку"})
    @Column({type: DataType.INTEGER})
    essenceID: number;
}