import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// функция запуска нашего приложения
async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule); // экземпляр приложения (передаём модуль приложения app.module.ts)

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();