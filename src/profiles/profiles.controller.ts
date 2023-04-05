import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/users/users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
@ApiTags("Пользователь и профиль")
@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService, private usersService: UsersService) {}

    @ApiOperation({summary: "Получение данных о пользователе и его профиле"})
    @ApiResponse({status: 200, type: Profile})
    @UseGuards(JwtAuthGuard) // используем гард авторизации
    @Get('/:id')
    getOne(@Param('id') id: number) {
        const profile = this.profilesService.getProfileByID(id);
        return profile;
    }

    @ApiOperation({summary: "Получение данных обо всех пользователях и их профилях"})
    @ApiResponse({status: 200, type: [Profile]})
    @UseGuards(JwtAuthGuard) // используем гард авторизации
    @Get()
    getAll() {
        const profiles = this.profilesService.getAllProfiles();
        return profiles;
    }

    @ApiOperation({summary: "Изменение данных о пользователе и его профиле"})
    @ApiResponse({status: 200, type: Profile})
    @Roles("admin") // через запятую указываем, каким ролям доступен этот эндпоинт
    @UseGuards(RolesGuard)
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
    @Roles("admin") // через запятую указываем, каким ролям доступен этот эндпоинт
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async deleteOne(@Param('id') id: number) {
        const profile = await this.profilesService.deleteProfile(id);
        const user = await this.usersService.deleteUser(id);
        return profile;
    }

    @ApiOperation({summary: "Добавление роли пользователю"})
    @ApiResponse({status: 200, type: Profile})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/role')
    async addRole(@Body() dto: AddRoleDto) {
        return this.profilesService.addRole(dto);
    }

    @ApiOperation({summary: "Бан пользователя"})
    @ApiResponse({status: 200, type: Profile})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/ban')
    async ban(@Body() dto: BanUserDto) {
        return this.profilesService.ban(dto.userID);
    }
}
