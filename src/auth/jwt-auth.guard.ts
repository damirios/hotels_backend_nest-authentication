import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable() // чтобы можно было внедрять
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest(); // получаем объект request (как в express)
        try {
            const authHeader = req.headers.authorization; // из headers у request достаём authorization (должен содержать токен)
            const bearer = authHeader.split(' ')[0]; 
            const token = authHeader.split(' ')[1]; 

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});  
            }
            // токен типа Bearer есть. Раскодируем его
            const user = this.jwtService.verify(token);
            req.user = user; // в объект req добавляем поле user, чтобы открыть доступ к эндпоинтам
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({message: "Пользователь не авторизован"});
        }


    }

}