import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
	controllers: [],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([User]),
	],
	exports: [
		UsersService,
	]
})
export class UsersModule {}
