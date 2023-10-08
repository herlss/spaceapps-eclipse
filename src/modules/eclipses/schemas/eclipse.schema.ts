import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAffected, IEclipse } from "../interfaces";

export type EclipseDocument = HydratedDocument<Eclipse>;

@Schema({ versionKey: false })
export class Eclipse implements IEclipse {
    @Prop({ required: true })
    affected: IAffected[];

    @Prop({ required: true })
    name: string;
}

export const EclipseSchema = SchemaFactory.createForClass(Eclipse);
