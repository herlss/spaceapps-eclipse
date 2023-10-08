import { Body, Controller, Get, Post } from "@nestjs/common";
import { EclipsesService } from "./eclipses.service";
import { Eclipse } from "./schemas/eclipse.schema";
import { CreateEclipseDto } from "./dto/create-eclipse.dto";

@Controller()
export class EclipsesController {
    constructor(private readonly eclipsesService: EclipsesService) {}
    
    @Get()
    async getEclipses(): Promise<Eclipse[]> {
        return await this.eclipsesService.getEclipses();
    }

    @Post()
    async createEclipse(
        @Body() eclipse: CreateEclipseDto
    ): Promise<Eclipse> {
        return await this.eclipsesService.createEclipse(eclipse);
    }
}