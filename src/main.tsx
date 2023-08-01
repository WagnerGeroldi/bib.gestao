import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithDrawBook from "./pages/WithDrawBook";
import ReturnBook from "./pages/ReturnBook";
import Books from "./pages/Books";
import Lector from "./pages/lector/Lector";
import Config from "./pages/Config";
import Report from "./pages/Report";
import RegisteLector from "./pages/lector/RegisterLector";
import UpdateLector from "./pages/lector/UpdateLector";
import LectorBooksInUse from "./pages/lector/LectorBooksInUse";
import CreateBook from "./pages/book/CreateBook";
import CreateAuthor from "./pages/book/CreateAuthor";
import CreateCategory from "./pages/book/CreateCategory";
import Author from "./pages/book/Author";
import UpdateAuthor from "./pages/book/UpdateAuthor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/withdrawbook" element={<WithDrawBook />} />
        <Route path="/returnbook" element={<ReturnBook />} />
        <Route path="/books" element={<Books />} />
        <Route path="/createbook" element={<CreateBook />} />
        <Route path="/createcategory" element={<CreateCategory />} />
        <Route path="/createauthor" element={<CreateAuthor />} />
        <Route path="/lector" element={<Lector />} />
        <Route path="/lector/updatelector/:id" element={<UpdateLector />} />
        <Route path="/author/updateAuthor/:id" element={<UpdateAuthor />} />
        <Route path="/author" element={<Author />} />
        <Route path="/report" element={<Report />} />
        <Route path="/configuration" element={<Config />} />
        <Route path="/registerlector" element={<RegisteLector />} />
        <Route path="/lector/booksInUse/:id" element={<LectorBooksInUse />} />

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
