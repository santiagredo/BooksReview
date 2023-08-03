import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindOneAuthDto {
    @IsEmail()
    correo: string;
}