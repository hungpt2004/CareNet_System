import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from "swiper/modules";
import { Card } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import biểu tượng ngôi sao
import "swiper/css/autoplay";

const TopCommentsSlider = ({ topComments }) => {
  // Hàm để hiển thị ngôi sao
  const renderStars = (rating) => {
    const maxStars = 5;
    return (
      <div className="d-flex">
        {[...Array(maxStars)].map((_, i) => (
          i < rating ? 
            <FaStar key={i} className="text-warning me-1" /> : 
            <FaRegStar key={i} className="text-secondary me-1" />
        ))}
      </div>
    );
  };

  return (
    <div className="my-5">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {topComments.map((comment) => (
          <SwiperSlide key={comment.id}>
            <Card style={{height: '180px'}} className=" shadow-sm">
              <Card.Body>
                <Card.Title>{comment.user}</Card.Title>
                <Card.Text>{comment.text}</Card.Text>
                {comment.rating && renderStars(comment.rating)}
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCommentsSlider;
