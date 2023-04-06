import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from './files.model';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
	controllers: [FilesController],
	providers: [FilesService],
	imports: [
		SequelizeModule.forFeature([FileModel]),
	],
	exports: [
		FilesService
	]
})
export class FilesModule {}
