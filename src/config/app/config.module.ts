import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config/dist";
import { AppConfigService } from "./config.service";
import configuration from "./configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_URL: Joi.string().default("http://localhost:3000"),
                APP_PORT: Joi.number().default(8080),
            }),
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
