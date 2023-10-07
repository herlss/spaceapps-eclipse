import { Module } from "@nestjs/common";
import { AppConfigModule } from "./config/app/config.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        AppConfigModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
