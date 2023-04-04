import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";

// описываем поля, которые нужны для создания объекта класса Profile
interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: '3', description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'indy@jones.com', description: "Электронная почта"})
    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @ApiProperty({example: 'qwerty123', description: "Пароль"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: "Статус забанен"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    ban: boolean;

    @HasOne(() => Profile)
    profile: Profile;
}