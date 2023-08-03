import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Book, BooksApiCallResults, booksQueries } from "../network";
import useBookUrl from "../Hooks/useBookUrl";
import { PageContext } from "./Context";

export default function Home() {
    const context = useContext(PageContext);

    const handleBookDetails = (book: Book) => {
        context.setBookDetails(book);
    };

    const [books, setBooks] = useState<BooksApiCallResults>();
    const [booksKeys, setBooksKeys] = useState<string[]>();

    useEffect(() => {
        const findAll = async () => {
            const foundBooks = await fetch(booksQueries.findAll);
            const results = await foundBooks.json();
            setBooks(results);
            setBooksKeys(Object.keys(results));
        };
        findAll();
    }, []);

    return (
        <main className="mx-auto max-w-5xl">
            <h1 className="mt-3 text-2xl lg:text-4xl text-center font-bold">
                ¡Gran Reseña de Libros!
            </h1>

            <p className="mt-2 lg:text-lg text-center">
                Encuentra los mejores libros disponibles en cada categoría
            </p>

            {!books && (
                <div className="w-full h-screen flex justify-center items-center text-center">
                    <p>¡Cargando los mejores libros!</p>
                </div>
            )}

            {books &&
                booksKeys &&
                booksKeys.map((genre) => {
                    return (
                        <section key={genre} className="mx-auto my-9 w-11/12">
                            <h2 className="text-xl lg:text-3xl font-semibold">
                                {genre}
                            </h2>

                            <div className="lg:grid lg:grid-cols-2">
                                {books[genre].map((book) => {
                                    const bookUrl = useBookUrl(book.titulo);

                                    return (
                                        <Link
                                            key={book._id}
                                            to={`/Libro/${bookUrl}`}
                                            onClick={() =>
                                                handleBookDetails(book)
                                            }>
                                            <article
                                                key={book._id}
                                                className="my-6 w-11/12 px-2 hover:bg-slate-100">
                                                <h3 className="text-lg lg:text-xl font-medium hover:underline">
                                                    {book.titulo}
                                                </h3>

                                                <p className="text-sm lg:text-lg">
                                                    {book.autor}
                                                </p>
                                            </article>
                                        </Link>
                                    );
                                })}

                                <div className="w-11/12 flex flex-row">
                                    <p className="mx-auto lg:mx-0 lg:my-auto w-full text-center lg:text-left lg:text-2xl font-bold">
                                        <Link
                                            to={`/Categoria/${genre}`}
                                            className="font-semibold hover:underline">
                                            Ver más {">"}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </section>
                    );
                })}
        </main>
    );
}
