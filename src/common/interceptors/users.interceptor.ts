import { 
    NestInterceptor, 
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";
import { Observable } from "rxjs";

export class UsersInterceptor implements NestInterceptor {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async intercept(
        context: ExecutionContext, 
        handler: CallHandler
    ): Promise<Observable<any>> {
        console.log(await this.usersService.getUsers());

        return handler.handle();
    }
}