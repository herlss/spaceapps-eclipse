import { Module } from "@nestjs/common";
import { AppConfigModule } from "./config/app/config.module";
import { UsersModule } from "./modules/users/users.module";
import { MongoProviderModule } from "./providers/database/mongo/provider.module";
import { EclipsesModule } from "./modules/eclipses/eclipses.module";

@Module({
    imports: [
        AppConfigModule,
        UsersModule,
        MongoProviderModule,
        EclipsesModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
