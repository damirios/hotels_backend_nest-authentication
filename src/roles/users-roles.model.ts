import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


// здесь атрибуты (второй дженерик) не понадобится, поскольку с этой таблицей мы взаимодействуем только опосредованно (не напрямую)
// и не нужно явно передавать какие-то значения
@Table({tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles> {
    @ApiProperty({example: '5', description: "Уникальный идентификатор таблицы пользователи-роли"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ApiProperty({example: '4', description: "ID пользователя"})
    @ForeignKey(() => User) // указываем, что это внешний ключ, который ссылается на таблицу, соответствующую User
    @Column({type: DataType.INTEGER})
    userID: number;
    
    @ApiProperty({example: '2', description: "ID роли"})
    @ForeignKey(() => Role) // указываем, что это внешний ключ, который ссылается на таблицу, соответствующую Role
    @Column({type: DataType.INTEGER})
    roleID: number;
}