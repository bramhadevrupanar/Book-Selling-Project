import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Edit.css";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    title: "",
    author: "",
    price: "",
    rating: "",
    image: ""
  });

  // Fetch book details on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/books/" + id)
      .then((res) => setValue(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  // Handle image upload -> convert to Base64
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue((prev) => ({ ...prev, image: reader.result })); // preserve previous state
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit update
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .patch("http://localhost:5000/books/" + id, value)
      .then(() => {
        alert("Book updated successfully!");
        navigate("/adminpanel");
      })
      .catch((err) => console.error("Error updating book:", err));
  }

  return (
    <div id="create-forms" className="container mt-4">
      <h1 className="mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-form">

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={value.original_title}
              onChange={(e) => setValue({ ...value, title: e.target.value })}
              required
              placeholder="Enter Book Title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              value={value.authors}
              onChange={(e) => setValue({ ...value, author: e.target.value })}
              required
              placeholder="Enter Author Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={value.books_count}
              onChange={(e) => setValue({ ...value, price: e.target.value })}
              required
              placeholder="Enter Price"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={value.category}
              onChange={(e) => setValue({ ...value, category: e.target.value })}
              required
              placeholder="Enter Price"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              className="form-control"
              value={value.average_rating}
              onChange={(e) => setValue({ ...value, rating: e.target.value })}
              required
              placeholder="Enter Rating (0-5)"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
            />
            {value?.image && (
              <img
                src={value.image_url}
                alt="Preview"
                width="200"
                style={{ borderRadius: "8px", marginTop: "10px" }}
              />
            )}
          </div>

          <div id="btns" className="d-flex gap-2">
            <button type="submit" className="btn btn-danger">
              Update
            </button>
            <Link to="/adminpanel" className="btn btn-primary">
              Back
            </Link>
          </div>

        </div>
      </form>
    </div>
  );
}

export default EditBook;
