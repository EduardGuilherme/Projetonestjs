import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "./create-recado.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateRecadoDto extends PartialType(CreateRecadoDto){
    /*readonly texto?: string;
    readonly de?: string;
    readonly para?: string;*/
    @IsBoolean()
    @IsOptional()
    readonly lido?: boolean
}