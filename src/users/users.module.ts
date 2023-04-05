import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
	controllers: [],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([User, Role]),
		RolesModule
	],
	exports: [
		UsersService,
	]
})
export class UsersModule {}
