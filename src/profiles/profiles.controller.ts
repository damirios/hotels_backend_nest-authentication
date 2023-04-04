import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/users/users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';

@ApiTags("Пользователь и профиль")
@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService, private usersService: UsersService) {}

    @ApiOperation({summary: "Создание пользователя и его профиля"})
    @ApiResponse({status: 200, type: Profile})
    @Post()
    async create(@Body() newUser: {profileDto: CreateProfileDto, userDto: CreateUserDto}) {
        const { profileDto, userDto } = newUser;
        const userID = await this.usersService.createUser(userDto);
        const profile = this.profilesService.createProfile(profileDto, userID);

        return profile;
    }

    @ApiOperation({summary: "Получение данных о пользователе и его профиле"})
    @ApiResponse({status: 200, type: Profile})
    @Get('/:id')
    getOne(@Param('id') id: number) {
        const profile = this.profilesService.getProfileByID(id);
        return profile;
    }

    @ApiOperation({summary: "Получение данных обо всех пользователях и их профилях"})
    @ApiResponse({status: 200, type: [Profile]})
    @Get()
    getAll() {
        const profiles = this.profilesService.getAllProfiles();
        return profiles;
    }

    @ApiOperation({summary: "Изменение данных о пользователе и его профиле"})
    @ApiResponse({status: 200, type: Profile})
    @Put('/:id')
    async updateOne(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
        let user: User;
        if (dto.email || dto.password) {
            user = await this.usersService.updateUser(id, dto);
        }

        const profile = await this.profilesService.updateProfile(id, dto);
        return profile;
    }

    @ApiOperation({summary: "Удаление пользователя и его профиля"})
    @ApiResponse({status: 200, type: Profile})
    @Delete('/:id')
    async deleteOne(@Param('id') id: number) {
        const profile = await this.profilesService.deleteProfile(id);
        const user = await this.usersService.deleteUser(id);
        return profile;
    }
}
