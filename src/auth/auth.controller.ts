import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Post('/signup')
    signup(@Body() dto: CreateUserProfileDto) {
        return this.authService.signup(dto);
    }
}
