import { Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/users/users.model';

@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService, private usersService: UsersService) {}

    @Post()
    async create(@Body() newUser: {profileDto: CreateProfileDto, userDto: CreateUserDto}) {
        const { profileDto, userDto } = newUser;

        const userID = await this.usersService.createUser(userDto);
        const profile = this.profilesService.createProfile(profileDto, userID);

        return profile;
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        const profile = this.profilesService.getProfileByID(id);
        return profile;
    }

    @Get()
    getAll() {
        const profiles = this.profilesService.getAllProfiles();

        return profiles;
    }

    @Put('/:id')
    async updateOne(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
        let user: User;
        if (dto.email || dto.password) {
            user = await this.usersService.updateUser(id, dto);
        }

        const profile = await this.profilesService.updateProfile(id, dto);
        return profile;
    }
}
