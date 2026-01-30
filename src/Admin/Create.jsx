import axios from 'axios';
import React, { useState } from 'react';
import './Create.css';
import { useNavigate, Link } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    original_title: "",
    authors: "",
    category:"",
    image_url: "",
    original_publication_year: "",
    language_code: "",
    average_rating: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue({ ...value, image_url: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/books", value)
      .then((res) => {
        console.log("Saved:", res.data);
        navigate("/adminpanel");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div id="create-forms">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-form">

          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input type="text" className="form-control"
              onChange={(e) => setValue({ ...value, original_title: e.target.value })}
              required placeholder="Enter Book Title" />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input type="text" className="form-control"
              onChange={(e) => setValue({ ...value, authors: e.target.value })}
              required placeholder="Enter Author Name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input type="text" className="form-control"
              onChange={(e) => setValue({ ...value, category: e.target.value })}
              required placeholder="Enter Author Name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input type="file" className="form-control" accept="image/*"
              onChange={handleImageChange} required />
          </div>

          {value.image_url && (
            <div className="mb-3">
              <strong>Preview:</strong><br />
              <img src={value.image_url} alt="Preview" width="200"
                style={{ borderRadius: "8px", marginTop: "8px" }} />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Publication Year</label>
            <input type="number" className="form-control"
              onChange={(e) => setValue({ ...value, original_publication_year: e.target.value })}
              required placeholder="Enter Publication Year" />
          </div>

          <div className="mb-3">
            <label className="form-label">Language Code</label>
            <input type="text" className="form-control"
              onChange={(e) => setValue({ ...value, language_code: e.target.value })}
              required placeholder="e.g. en, hi, fr" />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input type="number" className="form-control" min="1" max="5" step="0.1"
              onChange={(e) => setValue({ ...value, average_rating: e.target.value })}
              required placeholder="Enter Rating (1-5)" />
          </div>

          <div id='btns'>
            <button type="submit" className="btn btn-danger">Submit</button>
            <Link to="/adminpanel" className="btn btn-primary">Back</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
