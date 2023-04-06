import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'admin', description: "Название роли"})
    readonly value: string;

    @ApiProperty({example: ['banUser', 'deleteUser', 'changeRole'], description: "Привилегии роли"})
    readonly previliges: string[];
}