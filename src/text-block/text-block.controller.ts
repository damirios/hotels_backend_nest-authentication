import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlockService } from './text-block.service';

@ApiTags("Текстовый блок")
@Controller('text-block')
export class TextBlockController {

    constructor(private textBlockService: TextBlockService) {}

    @ApiOperation({summary: "Создание нового текстового блока"})
    @Roles("admin") // через запятую указываем, каким ролям доступен этот эндпоинт
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    createTextBlock(@Body() dto: CreateTextBlockDto, @UploadedFiles() images) {
        return this.textBlockService.create(dto, images);
    }

    @ApiOperation({summary: "Получение данных о текстовом блоке по фильтру"})
    @Get('/getByFilter/?')
    getByFilter(@Query('block_name') blockName: string, @Query('group_name') groupName: string) {
        if (blockName) {
            return this.textBlockService.getOneByUniqueName(blockName);
        }

        if (groupName) {
            return this.textBlockService.getByGroup(groupName);
        }

        return null;
    }

    @ApiOperation({summary: "Получение данных обо всех текстовых блоках"})
    @Get()
    getAllTextBlocks() {
        return this.textBlockService.getAll();
    }

    @ApiOperation({summary: "Получение данных о текстовом блоке по ID"})
    @Get('/:id')
    getTextBlockByID(@Param('id') id: number) {
        return this.textBlockService.getOneByID(id);
    }

    @ApiOperation({summary: "Изменение данных текстового блока"})
    @Roles("admin") // через запятую указываем, каким ролям доступен этот эндпоинт
    @UseGuards(RolesGuard)
    @Put('/:id')
    @UseInterceptors(FilesInterceptor('files'))
    updateTextBlock(@Param('id') id, @Body() dto: CreateTextBlockDto, @UploadedFiles() images) {
        return this.textBlockService.update(+id, dto, images);
    }

    @ApiOperation({summary: "Удаление текстового блока"})
    @Roles("admin") // через запятую указываем, каким ролям доступен этот эндпоинт
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteTextBlock(@Param('id') id) {
        return this.textBlockService.delete(+id);
    }
}
