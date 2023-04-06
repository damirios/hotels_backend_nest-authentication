import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './files.model';

@Injectable()
export class FilesService {

    constructor(@InjectModel(File) private fileRepository: typeof File) {}

    async createFiles(files, fileDto: CreateFileDto): Promise<File[]> { // file - собственно сам файл
        try {
            const filesArray = [];
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = uuid.v4() + '.jpg'; // можно переделать, чтобы получать расширение из названия исходного файла
                const filePath = path.resolve(__dirname, '..', 'static'); // будем сохранять в папку static в корне проекта
                if (!fs.existsSync(filePath)) { // если по пути filePath ничего не существует, нужно создать папку
                    fs.mkdirSync(filePath, {recursive: true}); // создаём все нужные папки
                }
                
                fs.writeFileSync(path.join(filePath, fileName), file.buffer); // сохраняем файл в файловой системе
                
                // Сохраняем в БД
                const dtoToWrite = {...fileDto};
                if (fileDto.essenceID.toString() === '') { dtoToWrite.essenceID = null }
                if (fileDto.essenceTable === '') { dtoToWrite.essenceTable = null }
                const fileInDB = await this.fileRepository.create({...dtoToWrite, fileName});
                filesArray[i] = fileInDB;
            }

            return filesArray; // возвращаем данные о файле
        } catch (error) {
            throw new HttpException("Ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR);   
        }
    }

    async getAllFiles() {
        return this.fileRepository.findAll();
    }

    async getFileByID(id: number) {
        return this.fileRepository.findByPk(id);
    }

    // async updateFile(id: number, fileDto: CreateFileDto, file: any): Promise<File> { // file - собственно сам файл
    //     try {
    //         const fileData = await this.getFileByID(id);
    //         if (file) { // если файл пришёл, нужно удалить старый файл
    //             const filePath = path.resolve(__dirname, '..', 'static', fileData.fileName);
    //             fs.unlinkSync(filePath); // удаляем старый

    //             const newFileName = uuid.v4() + '.jpg'; // можно переделать, чтобы получать расширение из названия исходного файла
    //             const newFilePath = path.resolve(__dirname, '..', 'static'); // будем сохранять в папку static в корне проекта
    //             fs.writeFileSync(path.join(newFilePath, newFileName), file.buffer); // сохраняем файл в файловой системе

    //             fileData.fileName = newFileName; // записываем новое имя в БД
    //         }
            
    //         // Сохраняем в БД
    //         if (fileDto.essenceID) { fileData.essenceID = +fileDto.essenceID }
    //         if (fileDto.essenceTable) { fileData.essenceTable = fileDto.essenceTable }
    //         await fileData.save();
    //         return fileData; // возвращаем данные о файле
    //     } catch (error) {
    //         throw new HttpException("Ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR);   
    //     }
    // }

    async deleteWasteFiles() { // удаляем лишние файлы (essence пустые, прошло больше часа с момента создания)
        try {
            const allFilesData = await this.fileRepository.findAll();
            const deletedFileNames = [];
            if (allFilesData) {
                for (let i = 0; i < allFilesData.length; i++) {
                    const fileData = allFilesData[i];
                    const filePath = path.resolve(__dirname, '..', 'static', fileData.fileName);
                    const timeDiffInSeconds = (Date.now() - fileData.createdAt) / 1000;
                    const emptyEssence = (!fileData.essenceID && !fileData.essenceTable);

                    if (timeDiffInSeconds > 3600 || emptyEssence) { // если прошло больше 3600 сек, то удаляем
                        fs.unlinkSync(filePath);
                        deletedFileNames.push(fileData);

                        // удаляем из БД
                        await this.fileRepository.destroy({where: {id: fileData.id}});
                    }
                }
            }

            return deletedFileNames;
        } catch (error) {
            throw new HttpException("Ошибка при удалении файла", HttpStatus.INTERNAL_SERVER_ERROR);   
        }
    }

    async deleteFilesOfEssence(table: string, id: number) {
        try {
            const allFilesData = await this.fileRepository.findAll({where: {essenceID: id, essenceTable: table}});
            const deletedFileNames = [];
            if (allFilesData) {
                for (let i = 0; i < allFilesData.length; i++) {
                    const fileData = allFilesData[i];
                    const filePath = path.resolve(__dirname, '..', 'static', fileData.fileName);
                    
                    fs.unlinkSync(filePath);
                    deletedFileNames.push(fileData);
                    await this.fileRepository.destroy({where: {id: fileData.id}});
                }
            }

            return deletedFileNames;
        } catch (error) {
            throw new HttpException("Ошибка при удалении файла", HttpStatus.INTERNAL_SERVER_ERROR);   
        }
    }
}
