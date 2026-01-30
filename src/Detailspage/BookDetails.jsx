import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Error fetching book:", err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5000/cart", { ...book, quantity: 1 });
      window.dispatchEvent(new Event("cartUpdated"));
      alert(`${book.original_title} added to cart ✅`);
      navigate('/order');
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-details">
      <img src={book.image_url || ""} alt={book.original_title || "Book"} data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine"/>
      <div className="book-info" data-aos="fade-left" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="500">
        <h2>{book.original_title}</h2>
        <p><strong>Author:</strong> {book.authors}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Publication Year:</strong> {book.original_publication_year}</p>
        <p><strong>Price:</strong> {book.books_count}</p>
        <p><strong>Average Rating:</strong> {book.average_rating} ⭐</p>
        <p><strong>Total Ratings:</strong> {book.ratings_count?.toLocaleString()}</p>
        <p><strong>Text Reviews:</strong> {book.work_text_reviews_count?.toLocaleString()}</p>

        <div className="button-group">
          <Link to="/morebook">
            <button className="back-btn">Back to Books</button>
          </Link>
          <button className="order-btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;