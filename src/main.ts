import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppConfigService } from "./config/app/config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig = app.get(AppConfigService);

    app.enableCors({
        origin: appConfig.url,
        methods: ["GET", "POST"]
    });

    await app.listen(appConfig.port);
}
bootstrap();
