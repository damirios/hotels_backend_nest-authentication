import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profiles.model';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile, private roleService: RolesService) {}

    async createProfile(dto: CreateProfileDto, userID: number) {
        const profile = await this.profileRepository.create({...dto, userID}, {include: {all: true}});
        const startingRole = await this.roleService.getRoleByValue('user');
        await profile.$set('roles', [startingRole.id]); // даём новому пользователю роль user по умолчанию
        return profile;
    }

    async getProfileByID(id: number) {
        const profile = await this.profileRepository.findByPk(id, {include: {all: true}});
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll({include: {all: true}});
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
}
