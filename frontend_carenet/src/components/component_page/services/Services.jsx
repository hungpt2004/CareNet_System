import React, { useState } from 'react';
import { Carousel, Button, Typography } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../../../css/BannerCarousel.module.css';

const { Title, Paragraph } = Typography;

const Services = () => {
  const [carouselRef, setCarouselRef] = useState(null);

  const banners = [
    {
      id: 1,
      title: 'Chung tay xây dựng tương lai tốt đẹp hơn',
      description:
        'Tham gia cùng chúng tôi trong các dự án tình nguyện trên khắp Việt Nam và tạo nên sự thay đổi tích cực.',
      image: '/volunteer_img/volunteer1.jpg',
      buttonText: 'Tham gia ngay',
      buttonLink: '/join',
    },
    {
      id: 2,
      title: 'Quyên góp cho chiến dịch "Áo ấm mùa đông" của Lâm Bảo Ngọc',
      description:
        'Mỗi đóng góp của bạn sẽ mang hơi ấm đến với trẻ em vùng cao trong mùa đông này.',
      image: '/volunteer_img/volunteer2.jpg',
      buttonText: 'Quyên góp',
      buttonLink: '/donate',
    },
    {
      id: 3,
      title: 'Quyên góp cho trẻ em vùng cao với HH Thùy Tiên',
      description:
        'Nâng cao kỹ năng và hiệu quả hoạt động tình nguyện với các khóa đào tạo miễn phí.',
      image: '/volunteer_img/volunteer3.jpg',
      buttonText: 'Đăng ký học',
      buttonLink: '/training',
    },
  ];

  const handlePrev = () => {
    if (carouselRef) {
      carouselRef.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef) {
      carouselRef.next();
    }
  };

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={`${styles.carouselArrow} ${styles.prev} ${styles.carouselArrows}`}
        onClick={handlePrev}
      >
        <ChevronLeft size={18} />
      </div>

      <Carousel ref={setCarouselRef} className={styles.carousel} {...carouselSettings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div className={styles.bannerSlide}>
              <img
                src={banner.image || `/placeholder.svg?height=400&width=1200&text=${banner.title}`}
                alt={banner.title}
                className={styles.bannerImage}
              />
              <div className={styles.bannerContent}>
                <Title level={2} className={`${styles.bannerTitle} text-light`}>
                  {banner.title}
                </Title>
                <Paragraph className={styles.bannerDescription}>
                  {banner.description}
                </Paragraph>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div
        className={`${styles.carouselArrow} ${styles.next} ${styles.carouselArrows}`}
        onClick={handleNext}
      >
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default Services;