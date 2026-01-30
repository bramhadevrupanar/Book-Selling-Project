import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        const allBooks = res.data.books ? res.data.books : res.data;
        const lastFiveBooks = allBooks.slice(-5);
        setBooks(lastFiveBooks);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading books...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="books-section">
      <div className="books-header" data-aos="flip-right">
        <p className="books-subtitle">Top Books for you</p>
        <h1 className="books-title">Top Books</h1>
        <p className="books-description">
          Explore our carefully selected collection of top-rated and trending books. From thrilling adventures and inspiring biographies to timeless classics, these books are handpicked to match your taste and enrich your reading experience.
        </p>
      </div>

      <div className="books-grid">
        {books.map(({ id, image_url, original_title, authors, average_rating }) => (
          <div
            key={id}
            className="book-card"
            onClick={() => navigate(`/book/${id}`)} // navigate to details page
            style={{ cursor: "pointer" }} // show pointer on hover
          >
            <img src={image_url} alt={original_title} className="book-image" />
            <h3 className="book-name">{original_title}</h3>
            <p className="book-author">{authors}</p>
            <div className="book-rating">
              <FaStar className="star-icon" />
              <span>{average_rating}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <Link to="/morebook" className="view-all-button">
          More Books
        </Link>
      </div>
    </div>
  );
};

export default Books;
