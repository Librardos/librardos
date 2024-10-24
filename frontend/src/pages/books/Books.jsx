import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./books.css";


export const Books = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchBooks = async () => {
    const res = await axios.get("/api/book");
    setBooks(res.data)
  }

  const handleFavorite = async (id) => {
    // alert("Libro añadido a favoritos");
    await axios.post(`/api/book/fav/${id}`, { user_id: user._id });
  }

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="medicine-main-div">
            <h1 className="medicine-title">Librardos</h1>
            <h2 className="medicine-sub-title">Lista de libros</h2>
            <div className="medicine-container">
              <ul className="medicine-sub-container">
                {books.map((book) => (
                  <div className="medicine-sub-container-div" key={book._id}>
                    <li className="medicine-name-container">
                    <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/" + book._id}
                        >
                          <span className="medicine-name">
                        {book.title}
                      </span>
                        </Link>
                      <div className="medicine-button-div">
                        <button
                          className="btn btn-danger button-medicine-delete"
                          onClick={() => handleFavorite(book._id)}
                        >
                          ❤️
                        </button>
                      </div>
                    </li>
                    <li>
                      <span>
                        Escritor: {book.writer}
                      </span>
                    </li>
                    <li>
                      <span>
                        Genero: {book.gender}
                      </span>
                    </li>
                    <li className="medicine-date-container">
                      <span className="medicine-date-text">
                        Fecha de edicion:
                      </span>
                      <Moment
                        className="medicine-date"
                        date={moment(book.date_edition).add(1, "d")}
                        format="MM/YYYY"
                      />
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Navbar />
          Necesita estar conectado
        </div>
      )}
    </>
  );
};
