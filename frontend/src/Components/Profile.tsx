import { useContext, useEffect, useState } from "react";
import { PageContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { User, getUserReviews } from "../network";

const user = new URL("../../public/user.svg", import.meta.url).href;

export default function Profile() {
    const context = useContext(PageContext);
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<User>();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!context.user._id) {
            navigate("/");
        }
    }, [context.user]);

    useEffect(() => {
        const fetchData = async () => {
            const user = {
                _id: context.user._id,
                correo: context.user.correo,
            };
            const token = localStorage.getItem("jwt");

            const results = await fetch(getUserReviews, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
            const data: User = await results.json();

            if (results.ok) {
                setReviews(data);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        bookId: string,
        bookName: string,
        rating: string,
        comment: string
    ) => {
        e.preventDefault();
        setLoading(true);
        const DeleteReviewDto = {
            bookId: bookId,
            bookName: bookName,
            rating: rating,
            comment: comment,
            _id: context.user._id,
            nombre: context.user.nombre,
            correo: context.user.correo,
        };

        const token = localStorage.getItem("jwt");

        const results = await fetch(`${getUserReviews}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(DeleteReviewDto),
        });

        const data: User = await results.json();

        if (results.ok) {
            setReviews(data);
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto w-11/12 max-w-5xl">
            <section className="flex flex-col md:flex-row justify-evenly items-center">
                <figure className="max-w-xs">
                    <img alt="Profile picture" src={user} className="w-full" />
                </figure>

                <div className="text-center">
                    <h2 className="text-xl font-semibold">
                        {context.user.nombre}
                    </h2>

                    <p>{context.user.correo}</p>
                </div>
            </section>

            <section className="mt-4">
                <p className="mt-4 text-center">Reseñas</p>

                {reviews?.resena &&
                    [...reviews.resena].reverse().map((review, index) => {
                        return (
                            <div
                                key={index}
                                className={`${
                                    loading && "opacity-50"
                                } mt-4 md:flex justify-between items-center`}>
                                <div>
                                    <p>Libro:</p>
                                    <p className="font-semibold">
                                        {`${review.bookName}: ${review.rating}/5`}
                                    </p>
                                </div>

                                <div className="mt-2 max-w-prose">
                                    <p>Comentario:</p>
                                    <p className="mt-1"> {review.comment}</p>
                                </div>

                                <form
                                    onSubmit={(e) =>
                                        handleSubmit(
                                            e,
                                            review.bookId,
                                            review.bookName,
                                            String(review.rating),
                                            review.comment
                                        )
                                    }
                                    className="mx-auto md:m-0 w-44"     
                                >
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="mt-4 mb-6 md:m-0 w-full max-w-md h-8 bg-black rounded-md text-white font-semibold">
                                        Eliminar reseña
                                    </button>
                                </form>
                            </div>
                        );
                    })}
            </section>
        </main>
    );
}
