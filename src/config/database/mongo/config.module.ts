import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config/dist";
import { MongoConfigService } from "./config.service";
import configuration from "./configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                CONNECTION_STRING: Joi.string()
            }),
        }),
    ],
    providers: [ConfigService, MongoConfigService],
    exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
