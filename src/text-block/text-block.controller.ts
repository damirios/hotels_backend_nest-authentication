import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlockService } from './text-block.service';

@ApiTags("Текстовый блок")
@Controller('text-block')
export class TextBlockController {

    constructor(private textBlockService: TextBlockService) {}

    @ApiOperation({summary: "Создание нового текстового блока"})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createTextBlock(@Body() dto: CreateTextBlockDto, @UploadedFile() image) {
        return this.textBlockService.create(dto, image);
    }

    @ApiOperation({summary: "Получение данных о текстовом блоке по ID"})
    @Get('/:id')
    getTextBlockByID(@Param('id') id: number) {
        return this.textBlockService.getOneByID(id);
    }

    @ApiOperation({summary: "Получение данных о текстовом блоке по уникальному названию"})
    @Get()
    getTextBlockByUniqueName(@Query('name') blockName: string) {
        return this.textBlockService.getOneByUniqueName(blockName);
    }

    @ApiOperation({summary: "Получение данных обо всех текстовых блоках"})
    @Get()
    getAllTextBlocks() {
        return this.textBlockService.getAll();
    }
}
