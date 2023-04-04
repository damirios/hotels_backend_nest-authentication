import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateProfileDto } from 'src/profiles/dto/update-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user.id; 
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
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
