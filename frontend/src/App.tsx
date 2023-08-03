import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Components/Home";
import SingleGenre from "./Components/SingleGenre";
import SingleBook from "./Components/SingleBook";
import { PageContextProvider } from "./Components/Context";
import Profile from "./Components/Profile";
import SearchResults from "./Components/SearchResults";

function App() {

    return (
        <Fragment>
            <PageContextProvider>
            <BrowserRouter>
                <Header/>

                <Routes>
                    <Route path="/Buscar/*" element={<SearchResults/>}/>
                    <Route path="/Perfil" element={<Profile/>}/>
                    <Route path="/Categoria/*" element={<SingleGenre/>}/>
                    <Route path="/Libro/*" element={<SingleBook/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            
            </BrowserRouter>
            </PageContextProvider>
        </Fragment>
    );
}

export default App;
