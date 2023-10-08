import { Module } from "@nestjs/common";
import { EclipsesController } from "./eclipses.controller";
import { EclipsesService } from "./eclipses.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Eclipse, EclipseSchema } from "./schemas/eclipse.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Eclipse.name, schema: EclipseSchema }
        ])
    ],
    controllers: [ EclipsesController ],
    providers: [ EclipsesService ]
})
export class EclipsesModule {}