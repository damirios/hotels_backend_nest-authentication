import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';
import { FileModel } from './files.model';
import { FilesService } from './files.service';

@ApiTags("Файлы")
@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}

    @ApiOperation({summary: "Создание файлов в БД и добавление их в файловую систему"})
    @ApiResponse({status: 200, type: [FileModel]})
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    createFiles(@Body() fileData: CreateFileDto, @UploadedFiles() files) {
        return this.filesService.createFiles(files, fileData);
    }

    @ApiOperation({summary: "Получение файлов"})
    @ApiResponse({status: 200, type: [FileModel]})
    @Get()
    getAllFiles() {
        return this.filesService.getAllFiles();
    }

    @ApiOperation({summary: "Получение файла по ID"})
    @ApiResponse({status: 200, type: FileModel})
    @Get('/:id')
    getByID(@Param('id') id: number) {
        return this.filesService.getFileByID(+id);
    }

    // @Put('/:id')
    // @UseInterceptors(FileInterceptor('file'))
    // updateFile(@Body() fileData: CreateFileDto, @Param('id') id: number, @UploadedFile() file) {
    //     console.log(arguments);
    //     return this.filesService.updateFile(+id, fileData, file);
    // }

    @ApiOperation({summary: "Удаление файлов"})
    @ApiResponse({status: 200, type: FileModel})
    @Delete()
    deleteWasteFiles() {
        return this.filesService.deleteWasteFiles();
    }
}
