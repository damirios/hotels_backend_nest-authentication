import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private profileService: ProfilesService,
    private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        const profile = await this.profileService.getProfileByUserID(user.id);
        const token = await this.generateToken(user);
        return { user, profile, token };
    }

    async signup(dto: CreateUserProfileDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) { // если пользователь с таким email уже есть, то выкидываем ошибку
            throw new HttpException("Пользователь с таким email уже есть", HttpStatus.BAD_REQUEST);
        }
        // если email не занят
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({email: dto.email, password: hashPassword});
        const profile = await this.profileService.createProfile({
            firstName: dto.firstName,
            lastName: dto.lastName,
            address: dto.address,
            phone: dto.phone,
            userID: user.id,
        });

        const token = await this.generateToken(user);
        return { user, profile, token };
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return this.jwtService.sign(payload);
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: "Неправильный email или пароль"});
    }
}
