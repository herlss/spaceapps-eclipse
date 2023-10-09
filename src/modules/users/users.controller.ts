import { 
    Controller, 
    Delete, 
    HttpCode,
    Get,
    Param
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Get("/room/:roomId")
    async getUsersByRoom(@Param("roomId") roomId): Promise<User[]> {
        return await this.usersService.getUsersByRoom(roomId);
    }

    @HttpCode(204)
    @Delete()
    async deleteUsers() {
        return await this.usersService.deleteUsers();
    }
}