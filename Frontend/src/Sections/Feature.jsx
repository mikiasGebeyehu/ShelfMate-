import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Features = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/book")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book images:", error);
        setLoading(false);
        alert("Failed to fetch books. Please try again later.");
      });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center space-y-6 p-6 mx-auto md:flex-row md:space-y-0 md:space-x-6">
      {/* Header Section */}
      <div className="text-center max-w-md md:text-left">
        <h1 className="text-3xl font-bold mb-4">Browse And Select E-Books</h1>
        <p className="text-gray-500 mb-6">
          Browse through our extensive collection of E-Books and select the one
          that you like.
        </p>
        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
          Learn More
        </button>
      </div>

      {/* Loading Spinner or Swiper */}
      <div className="swiper_container w-full max-w-3xl p-5  rounded-2xl shadow-lg">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            className="my-swiper"
          >
            {books.map((book, index) => (
              <SwiperSlide key={index}>
                <div className="book-slide flex flex-col items-center space-y-3">
                  <img
                    src={
                      book.image
                        ? `http://localhost:3000${book.image}`  // ✅ Make sure this correctly points to "/assets/images/..."
                        : "https://via.placeholder.com/150"
                    }
                    width={1000}
                    alt={book.title || `Book ${index + 1}`}
                    className="shadow-md object-cover w-full h-64 mx-4 p-3 rounded-xl"
                  />
                  <p className="text-lg font-medium text-center">
                    {book.title || "No Title Available"}
                  </p>
                </div>
              </SwiperSlide>
            ))}

            {/* Swiper Navigation */}
            <div className="slider-controler flex justify-center items-center mt-14">
            <div
                className="swiper-button-prev slider-arrow mx-2 ml-[-10px]"
                aria-label="Previous slide"
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div
                className="swiper-button-next slider-arrow mx-2 ml-8"
                aria-label="Next slide"
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Features;
