import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// описываем поля, которые нужны для создания объекта класса textBlock (в БД)
interface TextBlockCreationAttributes {
    uniqueName: string;
    title: string;
    text: string;
    group_name: string;
}

@Table({tableName: 'text_block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttributes> {
    @ApiProperty({example: '3', description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'main-hero-text', description: "Уникальное название блока (для поиска)"})
    @Column({type: DataType.STRING, allowNull: false})
    uniqueName: string;

    @ApiProperty({example: 'Добро пожаловать!', description: "Заголовок блока"})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Зарегистрируйтесь, чтобы получить доступ к функциям сайта', description: "Содержимое блока (текст)"})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ApiProperty({example: 'main-page', description: "Название группы текстовых блоков"})
    @Column({type: DataType.STRING, allowNull: false})
    group_name: string;
}