import { Module } from "@nestjs/common";
import { UsersGateway } from "./users.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [
        UsersController
    ],
    providers: [UsersGateway, UsersService]
})
export class UsersModule {}
