import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";


@Injectable() // чтобы можно было внедрять
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            if (!requiredRoles) { // если роли никак не ограничены, то возвращаем true - разрешаем доступ
                return true;
            }
            
            const req = context.switchToHttp().getRequest(); // получаем объект request (как в express)
            const authHeader = req.headers.authorization; // из headers у request достаём authorization (должен содержать токен)
            const bearer = authHeader.split(' ')[0]; 
            const token = authHeader.split(' ')[1]; 

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});  
            }

            // токен типа Bearer есть. Раскодируем его
            const user = this.jwtService.verify(token);
            req.user = user; // в объект req добавляем поле user, чтобы открыть доступ к эндпоинтам
            const isCorrectRole =  user.roles.some(role => requiredRoles.includes(role.value)); // есть ли среди требуемых ролей, наша роль
            
            const requestingUserID = Number(req.params.id);
            const currentUserID = user.id;

            // если нашей роли нет среди требуемых ролей, то проверяем на совпадение id (изменять и удалять себя можно)
            if (!isCorrectRole && currentUserID !== requestingUserID) { 
                return false;
            }

            return true;
        } catch (error) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
    }

}