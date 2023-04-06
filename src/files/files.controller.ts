import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesService } from './files.service';

@ApiTags("Файлы")
@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    createFiles(@Body() fileData: CreateFileDto, @UploadedFiles() files) {
        return this.filesService.createFiles(files, fileData);
    }

    @Get()
    getAllFiles() {
        return this.filesService.getAllFiles();
    }

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

    @Delete()
    deleteWasteFiles() {
        return this.filesService.deleteWasteFiles();
    }
}
