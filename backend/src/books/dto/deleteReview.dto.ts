import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteReviewDto {
    @IsNotEmpty()
    bookId: string

    @IsNotEmpty()
    bookName: string

    @IsNotEmpty()
    rating: string
    
    @IsNotEmpty()
    comment: string

    @IsNotEmpty()
    _id: string

    @IsNotEmpty()
    nombre: string

    @IsEmail()
    @IsNotEmpty()
    correo: string
}