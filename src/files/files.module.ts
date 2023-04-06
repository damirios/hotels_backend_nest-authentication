import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
	controllers: [],
	providers: [FilesService],
	exports: [
		FilesService
	]
})
export class FilesModule {}
