import { Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from './text-block.model';
import { FilesModule } from 'src/files/files.module';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	providers: [TextBlockService],
	controllers: [TextBlockController],
	imports: [
		SequelizeModule.forFeature([TextBlock, Role]),
		FilesModule, RolesModule, AuthModule
	]
})
export class TextBlockModule {}
