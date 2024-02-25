import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LocalisationDto {
    @IsString()
    @IsNotEmpty()
    localisationName: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longtitude: number;
}