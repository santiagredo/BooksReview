import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop()
    titulo: string;

    @Prop()
    autor: string;

    @Prop()
    resumen: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
