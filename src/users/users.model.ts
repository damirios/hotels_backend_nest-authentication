import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";

// описываем поля, которые нужны для создания объекта класса Profile
interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    ban: boolean;

    @HasOne(() => Profile)
    profile: Profile;
}