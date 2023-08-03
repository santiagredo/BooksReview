"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = exports.AuthService = class AuthService {
    constructor(databaseService, jwtAuthService, configService) {
        this.databaseService = databaseService;
        this.jwtAuthService = jwtAuthService;
        this.configService = configService;
        this.DATABASE_USERS_COLLECTION_NAME = this.configService.get('DATABASE_USERS_COLLECTION_NAME');
    }
    async register(userObject) {
        const searchUser = (await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOne({ correo: userObject.correo }));
        if (searchUser)
            throw new common_1.HttpException('Ya existe una cuenta asociada con ese correo', common_1.HttpStatus.UNAUTHORIZED);
        const { contrasena } = userObject;
        const plainToHash = await (0, bcrypt_1.hash)(contrasena, 10);
        const newUser = { ...userObject, contrasena: plainToHash, resena: [] };
        const result = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .insertOne(newUser);
        if (!result.acknowledged)
            throw new common_1.HttpException('Hubo un problema con el registro', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return this.login({
            contrasena: userObject.contrasena,
            correo: userObject.correo,
        });
    }
    async login(userObject) {
        const { correo, contrasena } = userObject;
        const searchUser = (await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOne({ correo }));
        if (!searchUser)
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        const checkPassword = await (0, bcrypt_1.compare)(contrasena, searchUser.contrasena);
        if (!checkPassword)
            throw new common_1.HttpException('Contraseña incorrecta', common_1.HttpStatus.UNAUTHORIZED);
        const payload = { id: searchUser._id, name: searchUser.nombre };
        const token = this.jwtAuthService.sign(payload);
        const data = {
            user: searchUser,
            token,
        };
        return data;
    }
    async delete(userObject) {
        const { correo } = userObject;
        const searchUser = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOneAndDelete({ correo });
        return Boolean(searchUser.ok);
    }
    async findUser(userObject) {
        const { correo } = userObject;
        const searchUser = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOne({ correo });
        return Boolean(searchUser);
    }
    async resetPassword(userObject) {
        const { correo, contrasena } = userObject;
        const plainToHash = await (0, bcrypt_1.hash)(contrasena, 10);
        const searchUser = await this.databaseService.database
            .collection(this.DATABASE_USERS_COLLECTION_NAME)
            .findOneAndUpdate({ correo }, { $set: { contrasena: plainToHash } });
        return Boolean(searchUser.ok);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_service_1.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map