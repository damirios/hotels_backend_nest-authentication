import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProfilesRoles } from "src/roles/profile-roles.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";

// описываем поля, которые нужны для создания объекта класса Profile
interface ProfileCreationAttributes {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    userID: number;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttributes> {
    @ApiProperty({example: '3', description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Индиана', description: "Имя пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @ApiProperty({example: 'Джонс', description: "Фамилия пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @ApiProperty({example: '+123456789', description: "Номер телефона"})
    @Column({type: DataType.STRING, allowNull: true})
    phone: string;

    @ApiProperty({example: 'г. Аркадия Бэй', description: "Адрес пользователя"})
    @Column({type: DataType.STRING, allowNull: true})
    address: string;

    @ApiProperty({example: '3', description: "Внешний ключ для таблицы user"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userID: number;

    @BelongsTo(() => User)
    user: User;

    // связь многие ко многим. Первый аргумент: с какой сущностью связываем, второй: через какую таблицу (пром. таблица)
    @BelongsToMany(() => Role, () => ProfilesRoles)
    roles: Role[];
}