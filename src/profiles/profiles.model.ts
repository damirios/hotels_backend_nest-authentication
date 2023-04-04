import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
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
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @Column({type: DataType.STRING, allowNull: true})
    phone: string;

    @Column({type: DataType.STRING, allowNull: true})
    address: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userID: number;

    @BelongsTo(() => User)
    user: User;
}