import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateProfileDto } from 'src/profiles/dto/update-profile.dto';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const startingRole = await this.roleService.getRoleByValue('user');
        await user.$set('roles', [startingRole.id]); // даём новому пользователю роль user по умолчанию
        user.roles = [startingRole];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByID(userID: number) {
        const user = await this.userRepository.findByPk(userID, {include: {all: true}});
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async updateUser(id: number, dto: UpdateProfileDto) {
        const user = await this.userRepository.findByPk(id);
        if (user) {
            if (dto.email) {
                user.email = dto.email;
            }
            if (dto.password) {
                user.password = dto.password;
            }
    
            await user.save();
            return user;
        }

        throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.destroy({where: {id}});
        return user;
    }
}
