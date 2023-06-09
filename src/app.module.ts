import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "./profiles/profiles.model";
import { ProfilesModule } from './profiles/profiles.module';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { AuthModule } from './auth/auth.module';
import { UsersRoles } from "./roles/users-roles.model";
import { UsersModule } from "./users/users.module";
import { TextBlockModule } from './text-block/text-block.module';
import { TextBlock } from "./text-block/text-block.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { FileModel } from "./files/files.model";

// основной модуль нашего приложения
@Module({
    // регистрируем здесь контроллеры
    controllers: [],
    // провайдеры содержат переиспользуемые компоненты (сервисы с логикой, реализация паттернов и тд)
    // в нашем случае там будут содержаться функции, которые будет вызывать контроллер
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env` // путь до файла конфигурации
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Profile, User, Role, UsersRoles, TextBlock, FileModel], // здесь содержатся модели (соответствуют таблицам из БД)
            autoLoadModels: true // sequelize будет автоматически создавать таблицы на основе наших моделей
        }),
        ProfilesModule,
        UsersModule,
        RolesModule,
        AuthModule,
        TextBlockModule,
        FilesModule
    ]

}) // в Nest всё построено вокруг декораторов (@Module - один из них)
export class AppModule {

}