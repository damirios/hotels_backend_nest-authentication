import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: CreateUserDto) {

    }

    @Post('/signup')
    signup(@Body() dto: CreateUserDto) {
        
    }
}
