import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value = 0, count = null }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} color="#f5a623" />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#f5a623" />);
    } else {
      stars.push(<FaRegStar key={i} color="#f5a623" />);
    }
  }

  return (
    <div className="product-rating" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {stars}
      {count !== null && (
        <span style={{ fontSize: "0.8rem", color: "#777" }}>({count})</span>
      )}
    </div>
  );
};

export default Rating;

  