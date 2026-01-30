import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Adminpanel.css";
import { Link } from 'react-router-dom';

function Adminpanel() {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then((res) => {
        setFetchData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(id) {
    const agree = window.confirm("Are you sure you want to delete?");
    if (agree) {
      axios.delete("http://localhost:5000/books/" + id)
        .then(() => {
          setFetchData(fetchData.filter((item) => item.id !== id)); // remove deleted item from state
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className='container-data'>
      <h1>📚 Books Admin Panel</h1>
      <Link to="/create" className="btn add btn-primary">Add +</Link>

      <table className="table table-striped table-bordered table-hover table-sm">
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Image</th>
            <th>Publication Year</th>
            <th>Language</th>
            <th>Rating</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {fetchData.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.original_title}</td>
              <td>{book.authors}</td>
              <td>{book.category}</td>
              <td>
                {book.image_url ? (
                  <img
                    src={book.image_url}
                    alt={book.title}
                    width="100"
                    height="80"
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{book.original_publication_year}</td>
              <td>{book.language_code}</td>
              <td>{book.average_rating}</td>
              <td className='action'>
                <div className="d-flex flex-wrap gap-2 justify-content-center ">
                  <Link to={`/edit/${book.id}`} className="btn btn-secondary">Update</Link>
                  <Link to={`/read/${book.id}`} className="btn btn-success">Read</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adminpanel;
