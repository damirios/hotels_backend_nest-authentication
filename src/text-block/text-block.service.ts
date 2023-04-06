import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlock } from './text-block.model';

@Injectable()
export class TextBlockService {

    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock, 
                private filesService: FilesService) {}

    async create(dto: CreateTextBlockDto, images: any) {
        const textBlock = await this.textBlockRepository.create(dto);
        const file = await this.filesService.createFiles(images, {essenceTable: 'text_block', essenceID: textBlock.id}); // вернёт строку с названием сохранённого файла
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

    async getByGroup(group_name: string) {
        const textBlocks = await this.textBlockRepository.findAll({where: {group_name}});
        return textBlocks;
    }

    async update(id: number, dto: CreateTextBlockDto, images: any) {
        const textBlock = await this.textBlockRepository.findByPk(id);
        if (textBlock) {
            if (images) { // если пришли новые файлы, то старые надо удалить
                await this.filesService.deleteFilesOfEssence('text_block', textBlock.id); // удалили из БД и ФС
                await this.filesService.createFiles(images, {essenceTable: 'text_block', essenceID: textBlock.id}); // добавили новые
            }
            
            if (dto.uniqueName) { textBlock.uniqueName = dto.uniqueName }
            if (dto.title) { textBlock.title = dto.title }
            if (dto.text) { textBlock.text = dto.text }
            if (dto.group_name) { textBlock.group_name = dto.group_name }


            await textBlock.save();
            return textBlock;
        }

        throw new HttpException("Текстовый блок не найден", HttpStatus.NOT_FOUND);
    }

    async delete(id: number) {
        const textBlock = await this.textBlockRepository.findByPk(id);
        if (textBlock) {
            // удаляем файлы из БД и файловой системы
            await this.filesService.deleteFilesOfEssence('text_block', textBlock.id);

            await this.textBlockRepository.destroy({where: {id: id}});
            return textBlock;
        }

        throw new HttpException("Текстовый блок не найден", HttpStatus.NOT_FOUND);
    }
}
