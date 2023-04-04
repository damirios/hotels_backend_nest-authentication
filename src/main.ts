import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

// функция запуска нашего приложения
async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule); // экземпляр приложения (передаём модуль приложения app.module.ts)

    // переменная для swagger
    const config = new DocumentBuilder()
        .setTitle("Задание для hotels. Небольшое бэк-приложение.")
        .setDescription("Работа с авторизацией, профилем, с ролями пользователей.")
        .setVersion('1.0.0')
        .addTag("damirios")
        .build()
    
    // сам документ
    const document = SwaggerModule.createDocument(app, config);
    // инициализация swagger документации
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();