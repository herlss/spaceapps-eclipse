import { ArrayNotEmpty, IsArray, IsDefined, IsString, ValidateNested } from "class-validator";
import { IEclipse } from "../interfaces";
import { Type } from "class-transformer";

export class CreateEclipseDto implements IEclipse {
    @IsDefined()
    @IsString()
    name: string;
    
    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => Array)
    affected: number[];
}
