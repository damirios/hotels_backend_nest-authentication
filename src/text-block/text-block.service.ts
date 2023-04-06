import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlock } from './text-block.model';

@Injectable()
export class TextBlockService {

    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock, 
                private filesService: FilesService) {}

    async create(dto: CreateTextBlockDto, image: any) {
        const fileName = await this.filesService.createFile(image); // вернёт строку с названием сохранённого файла
        const textBlock = this.textBlockRepository.create({...dto, image: fileName});
        return textBlock;
    }

    async getOneByID(id: number) {
        const textBlock = await this.textBlockRepository.findByPk(id);
        return textBlock;
    }

    async getOneByUniqueName(name: string) {
        const textBlock = await this.textBlockRepository.findOne({where: {uniqueName: name}});
        return textBlock;
    }

    async getAll() {
        const textBlocks = await this.textBlockRepository.findAll();
        return textBlocks;
    }
}
