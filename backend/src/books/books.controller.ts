import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { publishReviewDto } from './dto/publishReview.dto';
import { findUserReviewsDto } from './dto/findUserReviews.dto';
import { DeleteReviewDto } from './dto/deleteReview.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get("all")
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':genre')
    findByGenre(@Param('genre') genre: string) {
        return this.booksService.findByGenre(genre);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Post('reviews')
    publishBookReview(@Body() userObject: publishReviewDto) {
        return this.booksService.publishBookReview(userObject);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Post('user/reviews')
    findUserReviews(@Body() userObject: findUserReviewsDto) {
        return this.booksService.findUserReviews(userObject);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Delete('user/reviews')
    deleteReview(@Body() userObject: DeleteReviewDto) {
        return this.booksService.deleteReview(userObject);
    }

    @UsePipes(new ValidationPipe())
    @Post("search")
    findQuery(@Body() userObject: {query: string}) {
        return this.booksService.findQuery(userObject.query);
    }
}
