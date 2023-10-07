import { Module } from "@nestjs/common";
import { UsersGateway } from "./users.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    providers: [UsersGateway]
})
export class UsersModule {}