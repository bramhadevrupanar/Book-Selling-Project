import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Services.css";
import Img2 from "../../assets/books/book1.jpg";

const ServicesData = [
  {
    id: "5567", 
    img: "https://m.media-amazon.com/images/I/61Nc1XikDjL.jpg",
    title: "His Life",
    description:
      "The phrase His life will forever be changed describes a situation where a person experiences a profound and lasting alteration in their circumstances, perspective, or way of life, often as a result of a specific event or decision.",
  },
  {
    id: "ce82",
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwry_9QhGfOdwkDHF904PDJvtdG385c20hg&s",
    img: Img2,
    title: "Who's there",
    description:
      "It could be a children's book introducing animal sounds, a crime thriller exploring the drug world, or even a collection of short stories with supernatural elements.",
  },
  {
    id: "ed90", 
    img: "https://images.gr-assets.com/books/1358266080m/11857408.jpg",
    title: "Fifty Shades Darker",
    description:
      "A popular romance novel by E.L. James, continuing the Fifty Shades series.",
  },
];

const Services = () => {
  return (
    <div className="services-section" id="services">
      <div className="services-header"data-aos="flip-right">
        <p className="trending-text">Trending Books</p>
        <h1 className="main-title">Best Books</h1>
        <p className="sub-text">
          Discover the most popular books loved by readers worldwide.
        </p>
      </div>

      <div className="services-grid">
        {ServicesData.map((service) => (
          <div className="service-card" key={service.id} data-aos="fade-up">
            <div className="service-image-wrapper">
              <img
                src={service.img}
                alt={service.title}
                className="service-image"
              />
            </div>
            <div className="service-content">
              <div className="stars">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.description}</p>
              
              <Link to={`/book/${service.id}`}>
                <button className="order-btns">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
