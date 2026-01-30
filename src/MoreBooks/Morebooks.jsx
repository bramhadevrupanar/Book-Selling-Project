import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Morebookes.module.css";

function Morebookes() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        if (res.data.books) {
          setBooks(res.data.books);
        } else {
          setBooks(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading books...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.books}>
      <h2 className={styles.heading}>Books</h2>
      <div className={styles.container}>
        {books.map((book) => (
          <div key={book.id} className={styles.card} data-aos="zoom-in-left">
            <img src={book.image_url} alt={book.original_title} />
            <h3 className={styles.title}>{book.original_title}</h3>
            <p className={styles.author}>{book.authors}</p>
            <p><strong>Price:</strong> {book.books_count}</p>
            <Link to={`/book/${book.id}`}>
              <button>More Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Morebookes;
