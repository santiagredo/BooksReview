import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { booksQueries, BooksQueries, Book } from "../network";
import useBookUrl from "../Hooks/useBookUrl";
import { PageContext } from "./Context";

export default function SingleGenre() {
    const context = useContext(PageContext);
    const handleBookDetails = (book: Book) => {
        context.setBookDetails(book);
    };

    const genre = getCurrentGenre();
    const apiCall = booksQueries[genre];

    const [books, setBooks] = useState<Book[]>();

    useEffect(() => {
        const fetchData = async () => {
            if (apiCall) {
                const foundBooks = await fetch(apiCall);
                const results = await foundBooks.json();
                setBooks(results);
            }
        };
        fetchData();
    }, [genre]);

    return (
        <main className="mx-auto max-w-5xl">
            {!apiCall && (
                <div className="w-full h-screen flex flex-col justify-center items-center text-center">
                    <h2 className="my-3">
                        {
                            "Parece que intentas acceder a una ruta que no existe :("
                        }
                    </h2>

                    <Link
                        to="/"
                        className="text-blue-800 font-semibold underline">
                        Volver a Inicio
                    </Link>
                </div>
            )}

            {apiCall && !books && (
                <div className="w-full h-screen flex flex-col justify-center items-center text-center">
                    <h2 className="my-3">{"Cargando..."}</h2>
                </div>
            )}

            {books && (
                <section className="mx-auto my-6 w-11/12">
                    <h2 className="mt-3 text-2xl lg:text-4xl text-center font-bold">
                        {`Libros de ${genre}`}
                    </h2>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-20">
                        {books &&
                            books.map((book) => {
                                const bookUrl = useBookUrl(book.titulo);

                                return (
                                    <article
                                        key={book._id}
                                        className="mx-auto my-6 w-11/12">
                                        <Link to={`/Libro/${bookUrl}`} onClick={() => handleBookDetails(book)}>
                                            <h3 className="text-lg lg:text-xl font-medium underline">
                                                {book.titulo}
                                            </h3>
                                        </Link>

                                        <p className="text-sm lg:text-lg">
                                            {book.autor}
                                        </p>
                                    </article>
                                );
                            })}
                    </div>
                </section>
            )}
        </main>
    );
}

function getCurrentGenre() {
    const location = useLocation();
    const path = location.pathname.split("/");
    const genre = path[path.length - 1] as keyof BooksQueries;
    return genre;
}
