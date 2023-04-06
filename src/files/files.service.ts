import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> { // file - собственно сам файл
        try {
            const fileName = uuid.v4() + '.jpg'; // можно переделать, чтобы получать расширение из названия исходного файла
            const filePath = path.resolve(__dirname, '..', 'static'); // будем сохранять в папку static в корне проекта
            if (!fs.existsSync(filePath)) { // если по пути filePath ничего не существует, нужно создать папку
                fs.mkdirSync(filePath, {recursive: true}); // создаём все нужные папки
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer); // сохраняем файл в файловой системе
            return fileName; // возвращаем имя файла
        } catch (error) {
            throw new HttpException("Ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR);   
        }
    }
}
