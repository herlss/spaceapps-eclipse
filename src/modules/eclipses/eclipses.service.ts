import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Eclipse } from "./schemas/eclipse.schema";
import { CreateEclipseDto } from "./dto/create-eclipse.dto";

@Injectable()
export class EclipsesService {
    constructor(
        @InjectModel(Eclipse.name)
        private readonly eclipseModel: Model<Eclipse>,
    ) {}

    async getEclipses(): Promise<Eclipse[]> {
        return await this.eclipseModel.find();
    }

    async createEclipse(eclipse: CreateEclipseDto) {
        return await this.eclipseModel.create(eclipse);
    }
}