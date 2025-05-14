import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

/**
 * Chuyển đổi rating số thành danh sách icon sao
 * @param {number} rating - Chỉ số rating từ 1.0 đến 5.0
 * @returns {JSX.Element[]} Mảng các icon JSX
 */
const convertRatingToStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#ffc107" />); // sao đầy
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#ffc107" />); // nửa sao
    } else {
      stars.push(<FaRegStar key={i} color="#ccc" />); // sao rỗng
    }
  }

  return stars;
};

export default convertRatingToStars