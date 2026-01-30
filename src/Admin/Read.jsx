import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Read.css";

function Read() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
      });
  }, [id]);

  return (
    <div id="create-forms" className="container mt-4">

        <h1 className="mb-4"> Book Details</h1>

        <div className="mb-3">
          <strong>Title: </strong> {book?.title || "N/A"}
        </div>

        <div className="mb-3">
          <strong>Original Title: </strong> {book?.original_title || "N/A"}
        </div>

        <div className="mb-3">
          <strong>Author(s): </strong> {book?.authors || "Unknown"}
        </div>

        <div className="mb-3">
          <strong>Publication Year: </strong> {book?.original_publication_year || "N/A"}
        </div>

        <div className="mb-3">
          <strong>Category: </strong> {book?.category || "N/A"}
        </div>


        <div className="mb-3">
          <strong>Language: </strong> {book?.language_code || "N/A"}
        </div>

        <div className="mb-3 imga">
          <strong>Cover Image: </strong><br />
          {book?.image_url ? (
            <img
              src={book.image_url?.startsWith("http")
                ? book.image_url
                : `http://localhost:5000/${book.image_url}`}
              alt={book.title}
              width="250"
              height="350"
              style={{ borderRadius: "10px", objectFit: "cover", marginTop: "10px" }}
            />
          ) : (
            <span>No Image Available</span>
          )}
        </div>

        <div className="mb-3">
          <strong>Average Rating: </strong> ⭐ {book?.average_rating || "N/A"} <br />
          <strong>Total Ratings: </strong> {book?.ratings_count?.toLocaleString() || 0}
        </div>

        <div className="mb-3">
          <strong>Total Reviews: </strong> {book?.work_text_reviews_count || 0}
        </div>

        <div className="mb-3">
          <strong>ISBN: </strong> {book?.isbn || "N/A"} <br />
          <strong>ISBN13: </strong> {book?.isbn13 || "N/A"}
        </div>

        <div className="mb-3">
          <strong>Price: </strong> ₹{book?.books_count || "Not Available"}
        </div>

        <div id="btns" className="mt-4">
          <Link to={`/edit/${id}`} className="btn btn-secondary me-2">
            Update
          </Link>
          <Link to="/adminpanel" className="btn btn-primary">
            Back
          </Link>
        </div>
    </div>
  );
}

export default Read;
