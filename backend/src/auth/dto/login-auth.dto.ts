import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsNotEmpty()
    contrasena: string;
}