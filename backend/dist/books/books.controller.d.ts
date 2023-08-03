import { BooksService } from './books.service';
import { publishReviewDto } from './dto/publishReview.dto';
import { findUserReviewsDto } from './dto/findUserReviews.dto';
import { DeleteReviewDto } from './dto/deleteReview.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<{}>;
    findByGenre(genre: string): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    publishBookReview(userObject: publishReviewDto): Promise<import("mongodb").WithId<import("bson").Document>>;
    findUserReviews(userObject: findUserReviewsDto): Promise<import("mongodb").WithId<import("bson").Document>>;
    deleteReview(userObject: DeleteReviewDto): Promise<import("mongodb").WithId<import("bson").Document>>;
    findQuery(userObject: {
        query: string;
    }): Promise<any[]>;
}
