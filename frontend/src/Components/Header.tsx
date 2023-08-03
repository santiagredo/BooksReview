import React, { useState, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Book, booksQueries, searchRoute } from "../network";
import { PageContext } from "./Context";
import SessionModal from "./SessionModal";
import useBookUrl from "../Hooks/useCapitalize";

const logo = new URL("../../public/blackBooks.svg", import.meta.url).href;
const menu = new URL("../../public/menu.svg", import.meta.url).href;
const close = new URL("../../public/close.svg", import.meta.url).href;
const user = new URL("../../public/user.svg", import.meta.url).href;

export default function Header() {
    const context = useContext(PageContext);
    const navigate = useNavigate();
    const [sidemenuOpen, setSidemenuOpen] = useState(false);
    const [genresMenu, setGenresMenu] = useState(false);

    const [logoutConfirmation, setLogoutConfirmation] = useState(false);

    const [userMenu, setUserMenu] = useState(false);

    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleLogin = () => {
        setSidemenuOpen(false);
        context.setSessionModal(true);
    };

    const handleLogout = () => {
        localStorage.setItem("jwt", "");
        context.setUser({
            _id: "",
            correo: "",
            nombre: "",
            contrasena: "",
            resena: [],
        });
        setSidemenuOpen(false);
        setLogoutConfirmation(false);
        setUserMenu(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        context.setSearchResults([]);
        setLoading(true);
        context.setLoadingSearchResults(true);

            const response = await fetch(`${searchRoute}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({query: searchQuery}),
            });

            const results: Book[] = await response.json();

            navigate(`/Buscar/${useBookUrl(searchQuery)}`);
            setSidemenuOpen(false);
            context.setSearchResults(results);
            setLoading(false);
            context.setLoadingSearchResults(false);
    };

    const figureClasses = "w-12";

    return (
        <header className="top-0 right-0 mx-auto sticky py-2 px-3 w-full max-w-5xl flex justify-between items-center bg-white border-b lg:border lg:border-t-0 border-black">
            <Link to="/">
                <figure className={figureClasses}>
                    <img alt="Books icon" src={logo} />
                </figure>
            </Link>

            <Link to="/">
                <h2 className="text-center font-semibold">Books Review</h2>
            </Link>

            <button onClick={() => setSidemenuOpen(true)} className="lg:hidden">
                <figure className={figureClasses}>
                    <img alt="Side menu icon" src={menu} />
                </figure>
            </button>

            {sidemenuOpen && (
                <div className="top-0 right-0 w-screen h-screen absolute flex justify-end bg-black bg-opacity-50">
                    <nav className="py-2 px-3 w-screen max-w-xs h-screen flex flex-col border-l-2 border-black bg-white">
                        <button onClick={() => setSidemenuOpen(false)}>
                            <figure className={`${figureClasses} ml-auto`}>
                                <img alt="Close side menu icon" src={close} />
                            </figure>
                        </button>

                        {context.user._id && (
                            <Fragment>
                                <h2 className="text-xl font-semibold">
                                    {context.user.nombre}
                                </h2>

                                <Link
                                    onClick={() => setSidemenuOpen(false)}
                                    to="/Perfil"
                                    className="text-blue-500">
                                    Ver perfil
                                </Link>
                            </Fragment>
                        )}

                        <h2 className="mt-5 text-xl font-semibold">
                            Categorias
                        </h2>
                        <ul className="mt-5 grid grid-cols-2 gap-y-3">
                            {Object.keys(booksQueries).map((ele) => {
                                if (ele !== "findAll") {
                                    return (
                                        <Link
                                            className="text-blue-500"
                                            key={ele}
                                            to={`/Categoria/${ele}`}
                                            onClick={() =>
                                                setSidemenuOpen(false)
                                            }>
                                            {ele}
                                        </Link>
                                    );
                                }
                            })}
                        </ul>

                        <form
                            onSubmit={handleSubmit}
                            className="w-full mt-5 flex flex-col">
                            <input
                                type="text"
                                placeholder="Buscar un libro"
                                onChange={handleChange}
                                className="mt-2 px-2 h-8 border border-black rounded-md"
                            />
                            <button
                                disabled={loading}
                                type="submit"
                                className={`${loading && "opacity-50"} mt-2 h-8 bg-black rounded-md text-white font-semibold`}>
                                Buscar
                            </button>
                        </form>

                        {!context.user._id && (
                            <div className="h-1/2 flex items-end">
                                <button
                                    onClick={handleLogin}
                                    className="w-full h-8  bg-black rounded-md text-white font-semibold">
                                    Iniciar sesión
                                </button>
                            </div>
                        )}

                        {context.user._id && (
                            <div className="h-1/2 flex items-end">
                                {!logoutConfirmation && (
                                    <button
                                        onClick={() =>
                                            setLogoutConfirmation(true)
                                        }
                                        className="w-full h-8  bg-black rounded-md text-white font-semibold">
                                        Cerrar sesión
                                    </button>
                                )}

                                {logoutConfirmation && (
                                    <div className="w-full flex flex-col">
                                        <p className="text-center block text-2xl font-semibold">
                                            ¿Quieres cerrar tu sesión?
                                        </p>

                                        <button
                                            className="mt-4 h-8 w-full bg-black rounded-md text-white font-semibold"
                                            onClick={() =>
                                                setLogoutConfirmation(false)
                                            }>
                                            Cancelar
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="mt-4 h-8 bg-red-500 rounded-md text-white font-semibold">
                                            Cerrar
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>
            )}

            <div className="hidden lg:block w-full">
                <nav
                    className={`w-full max-w-full grid gap-5 bg-white text-center`}
                    style={{ gridTemplateColumns: "65% 15% 15%" }}>
                    <form className="w-full flex justify-center" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder="Buscar un libro"
                            className="mx-1 px-2 w-72 border border-black rounded-md"
                        />
                        <button
                            disabled={loading}
                            type="submit"
                            className={`${loading && "opacity-50"} mx-1 px-2 w-32 bg-black rounded-md text-white font-semibold`}>
                            Buscar
                        </button>
                    </form>

                    <div className="relative">
                        <button
                            onClick={() => setGenresMenu(!genresMenu)}
                            className="text-xl font-semibold cursor-pointer">
                            Categorias
                        </button>
                        <ul
                            className={`${
                                genresMenu ? "absolute" : "hidden"
                            } w-72 py-2 grid grid-cols-2 gap-y-3 bg-white border border-black rounded-sm`}
                            style={{ margin: "10% -60%" }}>
                            {Object.keys(booksQueries).map((ele) => {
                                if (ele !== "findAll") {
                                    return (
                                        <Link
                                            key={ele}
                                            to={`/Categoria/${ele}`}
                                            onClick={() =>
                                                setGenresMenu(false)
                                            }>
                                            {ele}
                                        </Link>
                                    );
                                }
                            })}
                        </ul>
                    </div>

                    <div className="flex items-end">
                        {!context.user._id && (
                            <button
                                onClick={handleLogin}
                                className="w-full h-8  bg-black rounded-md text-white font-semibold">
                                Iniciar sesión
                            </button>
                        )}

                        {context.user._id && (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenu(!userMenu)}
                                    className="px-2 flex gap-2 border border-black rounded-md">
                                    <figure className="w-8">
                                        <img
                                            alt="Menu icon"
                                            src={menu}
                                            className="w-full"
                                        />
                                    </figure>

                                    <figure className="w-8">
                                        <img
                                            alt="User icon"
                                            src={user}
                                            className="w-full"
                                        />
                                    </figure>
                                </button>

                                <ul
                                    className={`${
                                        userMenu ? "absolute" : "hidden"
                                    } w-max p-2 flex flex-col gap-y-1  bg-white border border-black rounded-sm font-semibold`}
                                    style={{ margin: "10% -12.5%" }}>
                                    <li>{context.user.nombre.split(" ")[0]}</li>
                                    <li>
                                        <Link
                                            onClick={() => setUserMenu(false)}
                                            to="/Perfil"
                                            className="text-blue-500">
                                            Ver perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500">
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {context.sessionModal && <SessionModal />}
        </header>
    );
}
