import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Book1 from "../../assets/books/book2.jpg";
import Book2 from "../../assets/books/book1.jpg";
import Book3 from "../../assets/books/book3.jpg";
import Vector from "../../assets/website/blue-pattern.png";
import "./Hero.css";

const ImageList = [
  {
    id: 1,
    img: Book1,
    title: "His Life will forever be Changed",
    description:
      "The phrase His life will forever be changed describes a situation where a person experiences a profound and lasting alteration in their circumstances, perspective, or way of life, often as a result of a specific event or decision. ",
  },
  {
    id: 2,
    img: Book2,
    title: "Who's there",
    description:
      "It could be a children's book introducing animal sounds, a crime thriller exploring the drug world, or even a collection of short stories with supernatural elements. It's also the famous question posed in Shakespeare's Hamlet, and a title for a travel book.",
  },
  {
    id: 3,
    img: Book3,
    title: "Lost Boy",
    description:
      "Lost Boy is a title associated with two different memoirs. Dave Pelzer's The Lost Boy is the sequel to his bestselling memoir A Child Called 'It', detailing his experiences in the foster care system after escaping his abusive mother. In contrast, Christina Henry's Lost Boy is a dark, reimagined origin story of Captain Hook, exploring his relationship with Peter Pan and Neverland.",
  },
];

const Hero = () => {
  const [imageId, setImageId] = useState(Book1);
  const [title, setTitle] = useState(ImageList[0].title);
  const [description, setDescription] = useState(ImageList[0].description);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  // Re-trigger animation whenever image/text changes
  useEffect(() => {
    AOS.refresh();
  }, [imageId, title, description]);

  return (
    <div className="hero" style={{ backgroundImage: `url(${Vector})` }}>
      <div className="hero-container">
        <div className="hero-grid">
          {/* Text Section */}
          <div className="hero-text" data-aos="fade-up">
            <h1 className="hero-title">
              {title}
              <p className="hero-author">by Anonymous</p>
            </h1>
            <p className="hero-description" data-aos="flip-right">{description}</p>
          </div>

          {/* Image Section */}
          <div className="hero-image-section" data-aos="zoom-in">
            <div className="main-image-wrapper">
              <img
                key={imageId} // 👈 Important: forces re-render animation
                src={imageId}
                alt="book"
                className="main-image"
                data-aos="zoom-in"
              />
            </div>

            {/* Thumbnails */}
            <div className="thumbnail-container">
              {ImageList.map((item, index) => (
                <img
                  key={item.id}
                  src={item.img}
                  alt="book"
                  onClick={() => {
                    setImageId(item.img);
                    setTitle(item.title);
                    setDescription(item.description);
                  }}
                  className="thumbnail"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
