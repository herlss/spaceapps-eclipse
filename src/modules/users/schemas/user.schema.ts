import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User implements IUser {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    position: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
