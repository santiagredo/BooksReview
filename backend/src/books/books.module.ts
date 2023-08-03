import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';

@Module({
    imports: [ConfigModule],
    controllers: [BooksController],
    providers: [BooksService, DatabaseService],
})
export class BooksModule {}
