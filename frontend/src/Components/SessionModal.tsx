import { Fragment, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { PageContext } from "./Context";
import {
    APILoginErrorResponse,
    APILoginResponse,
    sessionQueries,
} from "../network";
import useCapitalize from "../Hooks/useCapitalize";

const logo = new URL("../../public/blackBooks.svg", import.meta.url).href;
const close = new URL("../../public/close.svg", import.meta.url).href;
const leftArrow = new URL("../../public/left-arrow.svg", import.meta.url).href;

export default function Modal() {
    const container = document.getElementById("modal");
    const context = useContext(PageContext);

    const [loginModal, setLoginModal] = useState(true);
    const [signupModal, setSignupModal] = useState(false);
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

    const handleAbort = () => {
        context.setSessionModal(false);
        setLoginModal(true);
        setSignupModal(false);
        setForgotPasswordModal(false);
    };

    const handleModalInitial = () => {
        setLoginModal(true),
            setSignupModal(false),
            setForgotPasswordModal(false);
    };

    return (
        <Fragment>
            {context.sessionModal &&
                createPortal(
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div
                            onClick={handleAbort}
                            className="absolute inset-0 bg-black opacity-60"></div>

                        <div
                            className="w-screen max-w-xl h-screen p-4 bg-white rounded-md z-10"
                            style={{ maxHeight: "548px" }}>
                            <div className="w-full flex items-end">
                                {!loginModal && (
                                    <button
                                        onClick={handleModalInitial}
                                        className="">
                                        <figure className="w-8">
                                            <img
                                                alt="Close session modal"
                                                src={leftArrow}
                                            />
                                        </figure>
                                    </button>
                                )}
                                <button
                                    onClick={handleAbort}
                                    className="ml-auto">
                                    <figure className="w-8">
                                        <img
                                            alt="Close session modal"
                                            src={close}
                                        />
                                    </figure>
                                </button>
                            </div>

                            {!signupModal && !forgotPasswordModal && (
                                <LoginModalContent />
                            )}

                            {!signupModal && !forgotPasswordModal && (
                                <div className="flex flex-col text-center">
                                    <button
                                        onClick={() => {
                                            setSignupModal(true),
                                                setLoginModal(false);
                                        }}>
                                        Crear una cuenta
                                    </button>
                                    <button
                                        onClick={() => {
                                            setForgotPasswordModal(true),
                                                setLoginModal(false);
                                        }}>
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            )}

                            {!loginModal && !forgotPasswordModal && (
                                <Fragment>
                                    <SignupModalContent />
                                </Fragment>
                            )}
                            {!loginModal && !signupModal! && (
                                <ForgotPasswordModalContent />
                            )}
                        </div>
                    </div>,
                    container!
                )}
        </Fragment>
    );
}

function LoginModalContent() {
    const context = useContext(PageContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = {
            correo: email,
            contrasena: password,
        };

        const response = await fetch(`${sessionQueries.login}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const results: APILoginResponse | APILoginErrorResponse =
            await response.json();

        if ("token" in results) {
            localStorage.setItem("jwt", results.token);
            context.setUser(results.user);
            context.setSessionModal(false);
            setLoading(false);
        } else {
            setErrorMessage(true);
            setLoading(false);
        }
    };

    return (
        <section className="mt-2 h-5/6 flex flex-col justify-end text-center">
            <h2 className="text-xl">Bienvenido a Books Review</h2>

            <figure className="mx-auto mt-3 w-44">
                <img alt="Books icon" src={logo} />
            </figure>

            <p className="mt-5">
                Ingresa tu correo y contraseña para iniciar sesión
            </p>

            {errorMessage && (
                <p className="text-red-500 font-semibold">
                    Correo o contraseña incorrectos
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="correo@proveedor.com"
                    className="mt-2 px-2 h-8 border border-black rounded-md"
                    style={{ borderColor: `${errorMessage && "red"}` }}
                />
                <input
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="******"
                    className="mt-2 px-2 h-8 border border-black rounded-md"
                    style={{ borderColor: `${errorMessage && "red"}` }}
                />
                <button
                    disabled={loading}
                    type="submit"
                    className={`${loading && "opacity-50"} my-3 h-8 bg-black rounded-md text-white font-semibold`}>
                    Continúa
                </button>
            </form>
        </section>
    );
}

function SignupModalContent() {
    const context = useContext(PageContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [userExists, setUserExists] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = {
            nombre: useCapitalize(name),
            correo: email,
            contrasena: password,
        };

        try {
            const response = await fetch(`${sessionQueries.register}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setUserExists(true);
                    throw new Error(
                        "Ya existe una cuenta asociada con este correo"
                    );
                }
            }

            const results: APILoginResponse | APILoginErrorResponse =
                await response.json();

            if ("token" in results) {
                localStorage.setItem("jwt", results.token);
                context.setUser(results.user);
                context.setSessionModal(false);
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Ocurrió un error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled =
        name.length < 2 || password.length < 4 || email.length < 4 || loading;

    const divClasses = "mt-5 flex items-center justify-between";

    return (
        <section className="mt-2 h-full flex flex-col justify-center text-center">
            <h2 className="text-xl">Bienvenido a Books Review</h2>

            <p className="mt-5">
                Completa los siguientes campos para crear una cuenta
            </p>

            {errorMessage && (
                <p className="mt-2 text-red-500 font-semibold">
                    {errorMessage}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className={`flex flex-col ${loading && "opacity-50"}`}>
                <div className={`${divClasses} mt-2`}>
                    <span className="">Nombre</span>
                </div>
                <input
                    required={true}
                    onChange={handleNameChange}
                    type="text"
                    placeholder="Juan Perez"
                    className="mt-2 px-2 h-8 border border-black rounded-md"
                />
                <div className={divClasses}>
                    <span className="">Correo</span>
                    <span
                        className={`text-xs ${
                            userExists ? "text-red-500" : "hidden"
                        }`}>
                        Correo ya registrado
                    </span>
                </div>
                <input
                    required={true}
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="correo@proveedor.com"
                    className={`mt-2 px-2 h-8 border border-black rounded-md ${
                        userExists && "border-red-500"
                    }`}
                />
                <div className={divClasses}>
                    <span className="">Contraseña</span>
                    <span
                        className={`text-xs ${
                            password.length < 4 && "text-red-500"
                        }`}>
                        Mínimo 4 caracteres
                    </span>
                </div>
                <input
                    required={true}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="******"
                    className="mt-2 px-2 h-8 border border-black rounded-md"
                />
                <button
                    disabled={isSubmitDisabled}
                    type="submit"
                    className={`my-3 h-8 bg-black rounded-md text-white font-semibold ${
                        isSubmitDisabled && "opacity-50"
                    }`}>
                    Crear cuenta
                </button>
            </form>
        </section>
    );
}

function ForgotPasswordModalContent() {
    const context = useContext(PageContext);
    const [loading, setLoading] = useState(false);

    const [userExists, setUserExists] = useState(true);
    const [apiUserExists, setApiUserExists] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [findForm, setFindForm] = useState(true);

    const [passwordUpdated, setPasswordUpdated] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNewPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleFindUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = {
            correo: email,
        };

        try {
            const response = await fetch(`${sessionQueries.findOne}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const results = await response.json();

            if (!results) {
                setUserExists(false);
                setApiUserExists(false);
            } else {
                setApiUserExists(true);
                setUserExists(true);
                setFindForm(false);
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResetPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = {
            correo: email,
            contrasena: newPassword,
        };

        try {
            const response = await fetch(`${sessionQueries.reset}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const results: boolean = await response.json();

            if (results) {
                setPasswordUpdated(true);
                setErrorMessage("");
            } else {
                setErrorMessage(
                    "Tu contraseña no pudo ser restablecida, intenta de nuevo"
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Ocurrió un error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled =
        newPassword === confirmNewPassword && newPassword.length > 4;

    return (
        <section className="mt-2 h-full flex flex-col justify-center text-center">
            <h2 className="text-xl">Bienvenido a Books Review</h2>

            <p className="mt-5">Restablecer contraseña</p>

            {errorMessage && (
                <p className="mt-5 text-red-500">{errorMessage}</p>
            )}

            {findForm && !passwordUpdated && (
                <form
                    onSubmit={handleFindUserSubmit}
                    className={`flex flex-col ${loading && "opacity-50"}`}>
                    <div className="mt-5 w-full flex flex-col items-center justify-between">
                        <span className="w-full text-start">
                            Ingresa tu correo
                        </span>
                        <span
                            className={`w-full text-start text-xs ${
                                !apiUserExists && !userExists
                                    ? "text-red-500"
                                    : "hidden"
                            }`}>
                            Cuenta no encontrada
                        </span>
                    </div>
                    <input
                        required={true}
                        onChange={handleEmailChange}
                        type="email"
                        placeholder="correo@proveedor.com"
                        className={`mt-2 px-2 h-8 border border-black rounded-md ${
                            !userExists && "border-red-500"
                        }`}
                    />
                    <button
                        disabled={isSubmitDisabled}
                        type="submit"
                        className={`my-3 h-8 bg-black rounded-md text-white font-semibold ${
                            isSubmitDisabled && "opacity-50"
                        }`}>
                        Restablecer
                    </button>
                </form>
            )}

            {!findForm && !passwordUpdated && (
                <form
                    onSubmit={handleResetPasswordSubmit}
                    className={`flex flex-col ${loading && "opacity-50"}`}>
                    <div className="mt-5 flex flex-col items-center justify-between">
                        <span className="w-full text-start">
                            Ingresa tu nueva contraseña
                        </span>
                        <span
                            className={`text-xs ${
                                !apiUserExists && !userExists
                                    ? "text-red-500"
                                    : "hidden"
                            }`}>
                            Mínimo 4 caracteres
                        </span>
                    </div>
                    <input
                        required={true}
                        onChange={handleNewPasswordChange}
                        type="password"
                        placeholder="correo@proveedor.com"
                        className={`mt-2 px-2 h-8 border border-black rounded-md ${
                            !userExists && "border-red-500"
                        }`}
                    />
                    <div className="mt-5 flex flex-col items-center justify-between">
                        <span className="w-full text-start">
                            Confirma tu nueva contraseña
                        </span>
                        <span
                            className={`w-full text-start text-xs ${
                                newPassword !== confirmNewPassword
                                    ? "text-red-500"
                                    : "hidden"
                            }`}>
                            Las contraseñas no coinciden
                        </span>
                    </div>
                    <input
                        required={true}
                        onChange={handleConfirmNewPasswordChange}
                        type="password"
                        placeholder="correo@proveedor.com"
                        className={`mt-2 px-2 h-8 border border-black rounded-md ${
                            newPassword !== confirmNewPassword &&
                            "border-red-500"
                        }`}
                    />
                    <button
                        disabled={newPassword !== confirmNewPassword}
                        type="submit"
                        className={`my-3 h-8 bg-black rounded-md text-white font-semibold ${
                            newPassword !== confirmNewPassword && "opacity-50"
                        }`}>
                        Restablecer
                    </button>
                </form>
            )}

            {passwordUpdated && !findForm && (
                <div>
                    <h2 className="mt-5 font-semibold">Tu contraseña ha sido restablecida</h2>

                    <p className="mt-5">
                        Ya puedes inciar sesión con tu nueva contraseña
                    </p>

                    <button onClick={() => context.setSessionModal(false)} className="mt-10 h-8 w-full bg-black rounded-md text-white font-semibold">
                        Cerrar
                    </button>
                </div>
            )}
        </section>
    );
}
