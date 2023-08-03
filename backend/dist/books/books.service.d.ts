import { DatabaseService } from 'src/database/database.service';
import { publishReviewDto } from './dto/publishReview.dto';
import { ConfigService } from '@nestjs/config';
import { findUserReviewsDto } from './dto/findUserReviews.dto';
import { DeleteReviewDto } from './dto/deleteReview.dto';
export declare class BooksService {
    private readonly databaseService;
    private configService;
    constructor(databaseService: DatabaseService, configService: ConfigService);
    private bookGenres;
    private DATABASE_USERS_COLLECTION_NAME;
    findAll(): Promise<{}>;
    findByGenre(genre: string): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    publishBookReview(userObject: publishReviewDto): Promise<import("mongodb").WithId<import("bson").Document>>;
    findUserReviews(userObject: findUserReviewsDto): Promise<import("mongodb").WithId<import("bson").Document>>;
    deleteReview(userObject: DeleteReviewDto): Promise<import("mongodb").WithId<import("bson").Document>>;
    findQuery(query: string): Promise<any[]>;
}
