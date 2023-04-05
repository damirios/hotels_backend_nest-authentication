import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles'; // константа с ключом. Ключ позволит получать метаданные внутри гарда

// декоратор в метаданные записывает массив ролей, которые доступны потом по ключу ROLES_KEY
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);