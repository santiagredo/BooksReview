import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BookReview, publishReviewDto } from './dto/publishReview.dto';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import { findUserReviewsDto } from './dto/findUserReviews.dto';
import { DeleteReviewDto } from './dto/deleteReview.dto';

@Injectable()
export class BooksService {
    constructor(
        @Inject(DatabaseService)
        private readonly databaseService: DatabaseService,
        private configService: ConfigService,
    ) {}

    private bookGenres = {
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

    private DATABASE_USERS_COLLECTION_NAME = this.configService.get<string>(
        'DATABASE_USERS_COLLECTION_NAME',
    );

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
        } catch (error) {
            console.log(error);
        }
    }

    async findByGenre(genre: string) {
        try {
            const list = await this.databaseService.database
                .collection(genre)
                .find({})
                .toArray();
            return list;
        } catch (error) {
            console.log(error);
        }
    }

    async publishBookReview(userObject: publishReviewDto) {
        try {
            const { correo, _id } = userObject;
            const reviewOnUser = {
                bookId: userObject.bookId,
                bookName: userObject.bookName,
                rating: userObject.rating,
                comment: userObject.comment,
            };
            const reviewOnBook: BookReview = {
                nombre: userObject.nombre,
                _id: userObject._id,
                rating: userObject.rating,
                comment: userObject.comment,
            };

            const insertReviewOnUser = await this.databaseService.database
                .collection(this.DATABASE_USERS_COLLECTION_NAME)
                .updateOne(
                    { correo, _id: new ObjectId(_id) },
                    { $push: { resena: reviewOnUser } },
                );

            const insertReviewOnBook = await this.databaseService.database
                .collection(userObject.categoria)
                .updateOne(
                    { _id: new ObjectId(userObject.bookId) },
                    { $push: { resena: reviewOnBook } },
                );

            const foundBook = await this.databaseService.database
                .collection(userObject.categoria)
                .findOne({ _id: new ObjectId(userObject.bookId) });
            return foundBook;
        } catch (error) {
            console.log(error);
        }
    }

    async findUserReviews(userObject: findUserReviewsDto) {
        try {
            const { correo } = userObject;
            const _id = new ObjectId(userObject._id);
            const foundReviews = await this.databaseService.database
                .collection(this.DATABASE_USERS_COLLECTION_NAME)
                .findOne({ correo, _id });

            return foundReviews;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteReview(userObject: DeleteReviewDto) {
        try {
            for (const key in this.bookGenres) {
                await this.databaseService.database.collection(key).updateOne(
                    {
                        _id: new ObjectId(userObject.bookId),
                        titulo: userObject.bookName,
                    },
                    {
                        $pull: {
                            resena: {
                                nombre: userObject.nombre,
                                rating: userObject.rating,
                                comment: userObject.comment,
                            },
                        },
                    },
                );
            }

            const deletedReviewOnUser = await this.databaseService.database
                .collection(this.DATABASE_USERS_COLLECTION_NAME)
                .updateOne(
                    {
                        _id: new ObjectId(userObject._id),
                        nombre: userObject.nombre,
                    },
                    {
                        $pull: {
                            resena: {
                                bookName: userObject.bookName,
                                rating: userObject.rating,
                                comment: userObject.comment,
                            },
                        },
                    },
                );

            return this.findUserReviews({
                _id: userObject._id,
                correo: userObject.correo,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async findQuery(query: string) {
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

                iterator.forEach((ele) => {list.push(ele)}, 0)
            }

            return list;
        } catch (error) {
            console.log(error);
        }
    }
}
