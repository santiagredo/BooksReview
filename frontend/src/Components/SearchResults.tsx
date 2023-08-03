import { useContext } from "react";

import { PageContext } from "./Context";
import useBookUrl from "../Hooks/useBookUrl";
import { Book } from "../network";
import { Link } from "react-router-dom";

export default function SearchResults() {
    const context = useContext(PageContext);

    const handleBookDetails = (book: Book) => {
        context.setBookDetails(book);
    };

    return (
        <main className="mx-auto max-w-5xl">
            {!context.loadingSearchResults &&
                context.searchResults.length === 0 && (
                    <p className="mt-5 text-center text-2xl">{"Tu búsqueda no obtuvo resultados :("}</p>
                )}

            {context.loadingSearchResults && <p className="mt-5 text-center text-2xl">Cargando...</p>}

            {context.searchResults.length > 0 && (
                <div className="mx-auto mt-5 w-11/12 text-2xl">
                    <p className="text-center">Resultados de tu búsqueda: </p>
                    {context.searchResults.map((ele) => {
                        const bookUrl = useBookUrl(String(ele.titulo));

                        return (
                            <section
                                className="lg:grid lg:grid-cols-2"
                                key={ele._id}>
                                <Link
                                    to={`/Libro/${bookUrl}`}
                                    onClick={() => handleBookDetails(ele)}>
                                    <article className="my-6 w-11/12 px-2 hover:bg-slate-100">
                                        <h3 className="text-lg lg:text-xl font-medium hover:underline">
                                            {ele.titulo}
                                        </h3>

                                        <p className="text-sm lg:text-lg">
                                            {ele.autor}
                                        </p>
                                    </article>
                                </Link>
                            </section>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
