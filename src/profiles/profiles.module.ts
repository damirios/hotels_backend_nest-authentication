import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { ProfilesController } from './profiles.controller';
import { Profile } from './profiles.model';
import { ProfilesService } from './profiles.service';

@Module({
	controllers: [ProfilesController],
	providers: [ProfilesService],
	imports: [
		SequelizeModule.forFeature([Profile]),
		UsersModule, RolesModule
	],
	exports: [
		ProfilesService
	]
})
export class ProfilesModule {}
