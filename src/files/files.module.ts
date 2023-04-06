import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './files.model';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
	controllers: [FilesController],
	providers: [FilesService],
	imports: [
		SequelizeModule.forFeature([File]),
	],
	exports: [
		FilesService
	]
})
export class FilesModule {}
