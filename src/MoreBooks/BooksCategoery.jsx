import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./BooksByCategory.module.css";

function BooksByCategory() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        const filtered = res.data.filter(
          (book) => book.category.toLowerCase() === category.toLowerCase()
        );
        setBooks(filtered);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [category]);

  if (loading) return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div className={styles.books}>
      <h1 className={styles.heading}>{category} Books</h1>
      {books.length === 0 ? (
        <p className={styles.error}>No books found in this category.</p>
      ) : (
        <div className={styles.container}>
          {books.map((book) => (
            <div key={book.id} className={styles.card}>
              <img src={book.image_url} alt={book.title} />
              <h3 className={styles.title}>{book.title}</h3>
              <p className={styles.author}>{book.authors}</p>
              <p>⭐ {book.average_rating}</p>
              <Link to={`/book/${book.id}`}>
                <button>More Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksByCategory;
