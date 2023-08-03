import { Dispatch, createContext, useState } from "react";

import { Book, User } from "../network";

interface PageContextValue {
    bookDetails: Book;
    setBookDetails: Dispatch<React.SetStateAction<Book>>;

    sessionModal: boolean;
    setSessionModal: Dispatch<React.SetStateAction<boolean>>;

    user: User;
    setUser: Dispatch<React.SetStateAction<User>>;

    searchResults: Book[];
    setSearchResults: Dispatch<React.SetStateAction<Book[]>>

    loadingSearchResults: boolean;
    setLoadingSearchResults: Dispatch<React.SetStateAction<boolean>>;
}

export const PageContext = createContext<PageContextValue>({
    bookDetails: { _id: "", autor: "", resumen: "", titulo: "", categoria: "" },
    setBookDetails: () => {},
    sessionModal: false,
    setSessionModal: () => {},
    user: { _id: "", correo: "", nombre: "", resena: []},
    setUser: () => {},
    searchResults: [],
    setSearchResults: () => {},
    loadingSearchResults: false,
    setLoadingSearchResults: () => {}
});

interface PageContextProps {
    children: React.ReactNode;
}

export const PageContextProvider = ({ children }: PageContextProps) => {
    const [bookDetails, setBookDetails] = useState<Book>({
        _id: "",
        autor: "",
        resumen: "",
        titulo: "",
        categoria: "",
    });
    const [sessionModal, setSessionModal] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        _id: "",
        correo: "",
        nombre: "",
        resena: []
    });

    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [loadingSearchResults, setLoadingSearchResults] = useState(false);

    return (
        <PageContext.Provider
            value={{
                bookDetails,
                setBookDetails,
                sessionModal,
                setSessionModal,
                user,
                setUser,
                searchResults,
                setSearchResults,
                loadingSearchResults,
                setLoadingSearchResults
            }}>
            {children}
        </PageContext.Provider>
    );
};
