import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteAuthDto {
    @IsEmail()
    correo: string;
}