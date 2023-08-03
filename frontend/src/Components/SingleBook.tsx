import {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { PageContext } from "./Context";
import useImage from "../Hooks/useImage";
import SessionModal from "./SessionModal";
import { Book, postBookReviewRoute } from "../network";

const close = new URL("../../public/close.svg", import.meta.url).href;

export default function SingleBook() {
    const navigate = useNavigate();
    const context = useContext(PageContext);
    const imageSource = useImage(context.bookDetails.categoria);

    const [openReviewPanel, setOpenReviewPanel] = useState(false);

    const [rating, setRating] = useState(3);
    const [value, setValue] = useState("");

    const MIN_TEXTAREA_HEIGHT = 32;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [loading, setLoading] = useState(false);

    // const [errorMessage, setErrorMessage] = useState("");

    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";

            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight,
                MIN_TEXTAREA_HEIGHT
            )}px`;
        }
    }, [value]);

    useEffect(() => {
        if (!context.bookDetails.autor) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (rating < 1) {
            setRating(1);
        }
        if (rating > 5) {
            setRating(5);
        }
    }, [rating]);

    const handleReviewClick = () => {
        if (!context.user._id) {
            context.setSessionModal(true);
        } else {
            setOpenReviewPanel(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const postReviewDto = {
            _id: context.user._id,

            nombre: context.user.nombre,

            correo: context.user.correo,

            bookId: context.bookDetails._id,

            bookName: context.bookDetails.titulo,

            categoria: context.bookDetails.categoria,

            rating: String(rating),

            comment: value,
        };

        const token = localStorage.getItem("jwt");

        const response = await fetch(`${postBookReviewRoute}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postReviewDto),
        });

        const results: Book = await response.json();

        if (response.ok) {
            context.setBookDetails(results);
            setOpenReviewPanel(false);
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto my-5 w-11/12 max-w-5xl">
            <section>
                <figure className="mx-auto max-w-xs">
                    <img
                        alt={`${context.bookDetails.categoria} image`}
                        src={imageSource}
                        className="w-full"
                    />
                </figure>

                <h2 className="mt-3 text-4xl text-center font-bold">
                    {context.bookDetails.titulo}
                </h2>

                <h3 className="mt-3 font-semibold">
                    {`Autor: ${context.bookDetails.autor}`}
                </h3>

                <p className="mt-3">{context.bookDetails.resumen}</p>

                <p className="mt-3 text-sm">
                    {`Categoria: ${context.bookDetails.categoria}`}
                </p>
            </section>

            <section className="mt-6">
                <p>{`Reseñas: ${context.bookDetails.resena?.length}`}</p>

                {context.bookDetails.resena?.length === 0 && (
                    <p className="mt-3 text-center">
                        {`Aún no hay reseñas para este libro, es un buen momento para dejar una :)`}
                    </p>
                )}

                {!openReviewPanel && (
                    <div className="mt-6 w-full flex flex-col items-center">
                        <button
                            onClick={handleReviewClick}
                            className="w-full max-w-md h-8 bg-black rounded-md text-white font-semibold">
                            Crear reseña
                        </button>
                    </div>
                )}

                {openReviewPanel && context.user._id && (
                    <div className="mx-auto max-w-xl">
                        <div className="flex items-center justify-end">
                            <button onClick={() => setOpenReviewPanel(false)}>
                                <figure className="w-6">
                                    <img
                                        alt="Close review panel"
                                        src={close}
                                        className="w-full"
                                    />
                                </figure>
                            </button>
                        </div>
                        <form
                            className="w-full flex flex-col items-center"
                            onSubmit={handleSubmit}
                            style={{ opacity: `${loading && ".5"}` }}>
                            <span className="">Rating:</span>
                            <div className="mt-3 w-full grid grid-cols-3 text-center">
                                <button
                                    type="button"
                                    disabled={rating <= 1}
                                    onClick={() => setRating(rating - 1)}
                                    className={`${
                                        rating <= 1 && "opacity-50"
                                    } bg-black text-white border rounded-full font-extrabold`}>
                                    {"-"}
                                </button>

                                <p className="text-lg font-extrabold">
                                    {`${rating}/5`}
                                </p>

                                <button
                                    type="button"
                                    disabled={rating >= 5}
                                    onClick={() => setRating(rating + 1)}
                                    className={`${
                                        rating >= 5 && "opacity-50"
                                    } bg-black text-white border rounded-full font-extrabold`}>
                                    {"+"}
                                </button>
                            </div>

                            <span className="mt-5">Opinión</span>
                            <textarea
                                ref={textareaRef}
                                onChange={handleChange}
                                required={true}
                                placeholder="¿Qué tal te pareció este libro?"
                                style={{
                                    minHeight: MIN_TEXTAREA_HEIGHT,
                                    resize: "none",
                                }}
                                className="mt-2 w-full px-2 text-left placeholder:text-center border border-black rounded-md"
                            />

                            <button
                                onClick={handleReviewClick}
                                disabled={value.length < 20 || loading}
                                className={`${
                                    value.length < 20 && "opacity-50"
                                } mt-3 w-full max-w-md h-8 bg-black rounded-md text-white font-semibold`}>
                                Publicar reseña
                            </button>
                        </form>
                    </div>
                )}
            </section>
            {context.bookDetails.resena &&
                context.bookDetails.resena.length > 0 && <DisplayReviews />}
            {context.sessionModal && <SessionModal />}
        </main>
    );
}

function DisplayReviews() {
    const context = useContext(PageContext);

    return (
        <section className="mt-6 ">
            {context.bookDetails.resena &&
                [...context.bookDetails.resena].reverse().map((review, index) => {
                    return (
                        <div key={index} className="mt-5">
                            <p className="font-semibold">
                                {`${review.nombre.split(" ")[0]}: ${review.rating}/5`}
                            </p>

                            <p className="">
                                {review.comment}
                            </p>
                        </div>
                    );
                })}
        </section>
    );
}
