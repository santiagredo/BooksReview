import { IsEmail, IsNotEmpty } from 'class-validator';

export class publishReviewDto {
    @IsNotEmpty()
    _id: string

    @IsNotEmpty()
    nombre: string

    // @IsEmail()
    @IsNotEmpty()
    correo: string

    @IsNotEmpty()
    bookId: string

    @IsNotEmpty()
    bookName: string

    @IsNotEmpty()
    categoria: string

    @IsNotEmpty()
    rating: string
    
    @IsNotEmpty()
    comment: string
}

export interface BookReview {
    nombre: string;
    _id: string
    comment: string;
    rating: string;
}