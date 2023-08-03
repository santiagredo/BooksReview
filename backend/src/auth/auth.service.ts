import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare, hash } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { AuthDocument } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DeleteAuthDto } from './dto/delete-auto.dto';
import { FindOneAuthDto } from './dto/findOne-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(DatabaseService)
        private readonly databaseService: DatabaseService,
        private jwtAuthService: JwtService,
        private configService: ConfigService,
    ) {}

    private DATABASE_USERS_COLLECTION_NAME = this.configService.get<string>(
        'DATABASE_USERS_COLLECTION_NAME',
    );

    async register(userObject: RegisterAuthDto) {
        const searchUser = (await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOne({ correo: userObject.correo })) as AuthDocument;

        if (searchUser)
            throw new HttpException(
                'Ya existe una cuenta asociada con ese correo',
                HttpStatus.UNAUTHORIZED,
            );

        const { contrasena } = userObject;
        const plainToHash = await hash(contrasena, 10);
        const newUser = { ...userObject, contrasena: plainToHash, resena: [] };

        const result = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .insertOne(newUser);

        if (!result.acknowledged)
            throw new HttpException(
                'Hubo un problema con el registro',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );

        return this.login({
            contrasena: userObject.contrasena,
            correo: userObject.correo,
        });
    }

    async login(userObject: LoginAuthDto) {
        const { correo, contrasena } = userObject;
        const searchUser = (await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOne({ correo })) as AuthDocument;

        if (!searchUser)
            throw new HttpException(
                'Usuario no encontrado',
                HttpStatus.NOT_FOUND,
            );

        const checkPassword = await compare(contrasena, searchUser.contrasena);

        if (!checkPassword)
            throw new HttpException(
                'Contraseña incorrecta',
                HttpStatus.UNAUTHORIZED,
            );

        const payload = { id: searchUser._id, name: searchUser.nombre };
        const token = this.jwtAuthService.sign(payload);

        const data = {
            user: searchUser,
            token,
        };

        return data;
    }

    async delete(userObject: DeleteAuthDto) {
        const { correo } = userObject;

        const searchUser = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOneAndDelete({ correo });

        return Boolean(searchUser.ok);
    }

    async findUser(userObject: FindOneAuthDto) {
        const { correo } = userObject;

        const searchUser = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOne({ correo });

        return Boolean(searchUser);
    }

    async resetPassword(userObject: ResetAuthDto) {
        const { correo, contrasena } = userObject;
        const plainToHash = await hash(contrasena, 10);

        const searchUser = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOneAndUpdate({ correo }, { $set: {contrasena: plainToHash}});

        return Boolean(searchUser.ok);
    }
}
