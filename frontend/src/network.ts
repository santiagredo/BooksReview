// export const api = "http://localhost:3000/";
export const api = "https://booksreview.onrender.com/";

const booksRoute = "books/";

export const postBookReviewRoute = `${api}${booksRoute}reviews`;
export const getUserReviews = `${api}${booksRoute}user/reviews`;

export const searchRoute = `${api}${booksRoute}search`;

export type BooksQueries = {
    findAll: string;
    Aventura: string;
    Ciencia: string;
    Ficcion: string;
    Drama: string;
    Ensayos: string;
    Fantasia: string;
    Historia: string;
    Misterio: string;
    Poesia: string;
    Romance: string;
};

export const booksQueries: BooksQueries = {
    findAll: `${api}${booksRoute}all`,
    Aventura: `${api}${booksRoute}Aventura`,
    Ciencia: `${api}${booksRoute}Ciencia`,
    Ficcion: `${api}${booksRoute}Ficcion`,
    Drama: `${api}${booksRoute}Drama`,
    Ensayos: `${api}${booksRoute}Ensayos`,
    Fantasia: `${api}${booksRoute}Fantasia`,
    Historia: `${api}${booksRoute}Historia`,
    Misterio: `${api}${booksRoute}Misterio`,
    Poesia: `${api}${booksRoute}Poesia`,
    Romance: `${api}${booksRoute}Romance`,
};

export interface BookReview {
    nombre: string;
    _id: string
    comment: string;
    rating: number;
}

export interface Book {
    _id: string;
    titulo: string;
    autor: string;
    resumen: string;
    categoria: string;
    resena?: BookReview[];
}

export interface BooksApiCallResults {
    [key: string]: Book[];
}

export interface UserReview {
    bookId: string;
    bookName: string;
    rating: number;
    comment: string;
}

export interface User {
    _id: string;
    nombre: string;
    correo: string;
    contrasena?: string;
    resena?: UserReview[];
}

export interface SessionQueries {
    login: string,
    register: string,
    delete: string,
    findOne: string,
    reset: string
};

const authRoute = "auth/";

export const sessionQueries: SessionQueries = {
    login: `${api}${authRoute}login`,
    register: `${api}${authRoute}register`,
    delete: `${api}${authRoute}delete`,
    findOne: `${api}${authRoute}findOne`,
    reset: `${api}${authRoute}reset`,

};

export interface APILoginResponse {
    user:  User;
    token: string;
}

export interface APILoginErrorResponse {
    message?:    string[];
    error:      string;
    statusCode: number;
}