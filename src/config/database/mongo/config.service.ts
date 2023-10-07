import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongoConfigService {
    constructor(private configService: ConfigService) {}

    get conn(): string {
        return this.configService.get<string>("mongo.conn");
    }
}
