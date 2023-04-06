import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags("Роль пользователя")
@Controller('roles')
export class RolesController {

    // инджект сервиса
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: "Создание роли"})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        console.log('dto: ', dto);
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: "Получение роли по значению"})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
