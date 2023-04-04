import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
	controllers: [],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([User, Role])
	],
	exports: [
		UsersService,
	]
})
export class UsersModule {}
