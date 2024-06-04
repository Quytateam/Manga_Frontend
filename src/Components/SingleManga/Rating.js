import React, { useState } from "react";
import { RatingManga } from "../../Context/Functionalities";
import { useDispatch, useSelector } from "react-redux";

function Rating({ manganame, rate }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [hoverRating, setHoverRating] = useState(Math.ceil(rate));
  // const [mousePosition, setMousePosition] = useState({ x: null });
  const [isPastHalfX, setIsPastHalfX] = useState(
    (rate - Math.floor(rate)) * 10 < 1 ? true : false
  );
  // const typeValue = (value) => {
  //   const decimalValue = (value - Math.floor(value)) * 10;
  //   if (decimalValue > 7) {
  //     return Math.ceil(value);
  //   }
  //   if (decimalValue >= 3 && decimalValue <= 7) {
  //   }
  // };
  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(Math.ceil(rate));
    setIsPastHalfX((rate - Math.floor(rate)) * 10 < 1 ? true : false);
  };

  const handleMouseMove = (event) => {
    // Tính toán vị trí tương đối của chuột trên hình ảnh
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (x > rect.width / 2) {
      setIsPastHalfX(true);
    } else {
      setIsPastHalfX(false);
    }
  };
  const handleClick = (v) => {
    const value = isPastHalfX ? v : v - 0.5;
    RatingManga(manganame, value, dispatch, userInfo);
    // console.log(value);
    // setRating(value);
  };
  return (
    <div className="row rating">
      <div className="col-xs-6">
        <div
          className="star"
          data-rating={rate}
          data-allowrating="true"
          style={{ cursor: "pointer" }}
        >
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
              <img
                key={value}
                src={
                  value <= (hoverRating || rate)
                    ? index + 1 === hoverRating && !isPastHalfX
                      ? "/images/star-half.png"
                      : "/images/star-on.png"
                    : "/images/star-off.png"
                }
                alt={value}
                title={value}
                onMouseMove={handleMouseMove}
                onMouseOver={() => handleMouseOver(value)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(value)}
              />
            );
          })}
          <input type="hidden" name="score" value="4.3" />
        </div>
      </div>
    </div>
  );
}

export default Rating;
