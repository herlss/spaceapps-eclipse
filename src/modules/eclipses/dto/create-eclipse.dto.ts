import { ArrayNotEmpty, IsArray, IsDefined, IsString, ValidateNested } from "class-validator";
import { IAffected, IEclipse } from "../interfaces";
import { Type } from "class-transformer";

class AffectedDto implements IAffected {
    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Number)
    coordinates: number[];

    @IsDefined()
    @IsString()
    name: string;
}

export class CreateEclipseDto implements IEclipse {
    @IsDefined()
    @IsString()
    name: string;
    
    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => AffectedDto)
    affected: AffectedDto[];
}
