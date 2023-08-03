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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const config_1 = require("@nestjs/config");
const mongodb_1 = require("mongodb");
let BooksService = exports.BooksService = class BooksService {
    constructor(databaseService, configService) {
        this.databaseService = databaseService;
        this.configService = configService;
        this.bookGenres = {
            Aventura: 'Aventura',
            Ciencia: 'Ciencia',
            Ficcion: 'Ficcion',
            Drama: 'Drama',
            Ensayos: 'Ensayos',
            Fantasia: 'Fantasia',
            Historia: 'Historia',
            Misterio: 'Misterio',
            Poesia: 'Poesia',
            Romance: 'Romance',
        };
        this.DATABASE_USERS_COLLECTION_NAME = this.configService.get('DATABASE_USERS_COLLECTION_NAME');
    }
    async findAll() {
        try {
            let list = {};
            for (const key in this.bookGenres) {
                list = {
                    ...list,
                    [key]: await this.databaseService.database
                        .collection(key)
                        .find()
                        .limit(5)
                        .toArray(),
                };
            }
            return list;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findByGenre(genre) {
        try {
            const list = await this.databaseService.database
                .collection(genre)
                .find({})
                .toArray();
            return list;
        }
        catch (error) {
            console.log(error);
        }
    }
    async publishBookReview(userObject) {
        try {
            const { correo, _id } = userObject;
            const reviewOnUser = {
                bookId: userObject.bookId,
                bookName: userObject.bookName,
                rating: userObject.rating,
                comment: userObject.comment,
            };
            const reviewOnBook = {
                nombre: userObject.nombre,
                _id: userObject._id,
                rating: userObject.rating,
                comment: userObject.comment,
            };
            const insertReviewOnUser = await this.databaseService.database
                .collection(this.DATABASE_USERS_COLLECTION_NAME)
                .updateOne({ correo, _id: new mongodb_1.ObjectId(_id) }, { $push: { resena: reviewOnUser } });
            const insertReviewOnBook = await this.databaseService.database
                .collection(userObject.categoria)
                .updateOne({ _id: new mongodb_1.ObjectId(userObject.bookId) }, { $push: { resena: reviewOnBook } });
            const foundBook = await this.databaseService.database
                .collection(userObject.categoria)
                .findOne({ _id: new mongodb_1.ObjectId(userObject.bookId) });
            return foundBook;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findUserReviews(userObject) {
        try {
            const { correo } = userObject;
            const _id = new mongodb_1.ObjectId(userObject._id);
            const foundReviews = await this.databaseService.database
                .collection(this.DATABASE_USERS_COLLECTION_NAME)
                .findOne({ correo, _id });
            return foundReviews;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteReview(userObject) {
        try {
            for (const key in this.bookGenres) {
                await this.databaseService.database.collection(key).updateOne({
                    _id: new mongodb_1.ObjectId(userObject.bookId),
                    titulo: userObject.bookName,
                }, {
                    $pull: {
                        resena: {
                            nombre: userObject.nombre,
                            rating: userObject.rating,
                            comment: userObject.comment,
                        },
                    },
                });
            }
            const deletedReviewOnUser = await this.databaseService.database
                .collection(this.DATABASE_USERS_COLLECTION_NAME)
                .updateOne({
                _id: new mongodb_1.ObjectId(userObject._id),
                nombre: userObject.nombre,
            }, {
                $pull: {
                    resena: {
                        bookName: userObject.bookName,
                        rating: userObject.rating,
                        comment: userObject.comment,
                    },
                },
            });
            return this.findUserReviews({
                _id: userObject._id,
                correo: userObject.correo,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async findQuery(query) {
        try {
            let list = [];
            for (const key in this.bookGenres) {
                const iterator = await this.databaseService.database
                    .collection(key)
                    .find({
                    $or: [
                        { titulo: { $regex: query, $options: 'i' } },
                        { resumen: { $regex: query, $options: 'i' } },
                        { autor: { $regex: query, $options: 'i' } },
                        { categoria: { $regex: query, $options: 'i' } },
                    ],
                })
                    .toArray();
                iterator.forEach((ele) => { list.push(ele); }, 0);
            }
            return list;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_service_1.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService])
], BooksService);
//# sourceMappingURL=books.service.js.map