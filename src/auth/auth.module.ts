import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { TextBlockModule } from 'src/text-block/text-block.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		UsersModule,
		forwardRef(() => ProfilesModule),
		JwtModule.register({ // регистрируем в модуле авторизации модуль jwt, чтобы с ним работать
			secret: process.env.PRIVATE_KEY || 'secret',
			signOptions: {
			expiresIn: '24h' // время жизни токена (24 часа)
			}
		})
	],
	exports: [
		AuthService, JwtModule
	]
})
export class AuthModule {}
