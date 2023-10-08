import { ArrayNotEmpty, IsArray, IsDefined, IsString } from "class-validator";
import { IAffected, IEclipse } from "../interfaces";

export class CreateEclipseDto implements IEclipse {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    affected: IAffected[];
}
