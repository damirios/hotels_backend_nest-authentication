import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    async login(dto: CreateUserDto) {

    }

    async signup(dto: CreateUserDto) {
        
    }
}
