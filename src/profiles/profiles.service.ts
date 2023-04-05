import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profiles.model';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile, private roleService: RolesService,
        private userService: UsersService) {}

    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto, {include: {all: true}});
        return profile;
    }

    async getProfileByID(id: number) {
        const profile = await this.profileRepository.findByPk(id, {include: {all: true}});
        return profile;
    }

    async getProfileByUserID(id: number) {
        const profile = await this.profileRepository.findOne({where: {userID: id}});
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll({include: [{model: User, include: [Role]}]});
        return profiles;
    }

    async updateProfile(id: number, dto: UpdateProfileDto) {
        let profile = await this.profileRepository.findByPk(id, {include: {all: true}});

        if (profile) {
            if (dto.firstName) { profile.firstName = dto.firstName }
            if (dto.lastName) { profile.lastName = dto.lastName }
            if (dto.address) { profile.address = dto.address }
            if (dto.phone) { profile.phone = dto.phone }
            
            await profile.save();
            return profile;
        }

        throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    async deleteProfile(id: number) {
        const profile = await this.profileRepository.destroy({where: {id}});
        return profile;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userService.getUserByID(dto.userID);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        
        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
    }

    async ban(userID: number) {
        const user = await this.userService.getUserByID(userID);
        if (!user) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
        }

        user.ban = true;
        await user.save();
        return user;
    }
}
