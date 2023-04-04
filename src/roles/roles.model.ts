import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";
import { User } from "src/users/users.model";
import { ProfilesRoles } from "./profile-roles.model";

// описываем поля, которые нужны для создания объекта класса Roles
interface RoleCreationAttributes {
    value: string; // user, moderator, admin
    privileges: string[]; // ban user, delete user, unban user и тд
}

@Table({tableName: 'role'})
export class Role extends Model<Role, RoleCreationAttributes> {
    @ApiProperty({example: '5', description: "Уникальный идентификатор роли"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'admin', description: "Название роли"})
    @Column({type: DataType.STRING, allowNull: false})
    value: string;
    
    @ApiProperty({example: ['удаление пользователя, бан, разбан'], description: "Привилегии, доступные конкретной роли"})
    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false})
    privileges: string[];

    // связь многие ко многим. Первый аргумент: с какой сущностью связываем, второй: через какую таблицу (пром. таблица)
    @BelongsToMany(() => Profile, () => ProfilesRoles)
    profiles: Profile[];
}