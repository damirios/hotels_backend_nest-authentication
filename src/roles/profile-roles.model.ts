import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";
import { Role } from "./roles.model";


// здесь атрибуты (второй дженерик) не понадобится, поскольку с этой таблицей мы взаимодействуем только опосредованно (не напрямую)
// и не нужно явно передавать какие-то значения
@Table({tableName: 'profiles_roles', createdAt: false, updatedAt: false})
export class ProfilesRoles extends Model<ProfilesRoles> {
    @ApiProperty({example: '5', description: "Уникальный идентификатор таблицы пользователи-роли"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ApiProperty({example: '4', description: "ID пользователя"})
    @ForeignKey(() => Profile) // указываем, что это внешний ключ, который ссылается на таблицу, соответствующую User
    @Column({type: DataType.INTEGER})
    profileID: number;
    
    @ApiProperty({example: '2', description: "ID роли"})
    @ForeignKey(() => Role) // указываем, что это внешний ключ, который ссылается на таблицу, соответствующую Role
    @Column({type: DataType.INTEGER})
    roleID: number;
}