import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
    @IsNotEmpty()
    nombre: string;

    @IsEmail()
    correo: string;

    @MinLength(4)
    @MaxLength(20)
    contrasena: string;
}
