import { IsEmail, IsNotEmpty } from "class-validator"


export class findUserReviewsDto {
    @IsNotEmpty()
    _id: string

    @IsEmail()
    @IsNotEmpty()
    correo: string
}