import { Module } from "@nestjs/common";
import { UsersGateway } from "./users.gateway";

@Module({
    providers: [UsersGateway]
})
export class UsersModule {}