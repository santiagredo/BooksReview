import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class ResetAuthDto {
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    contrasena: string;
}
