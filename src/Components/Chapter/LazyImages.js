import React from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import MangaImage from "./MangaImage";

const Gallery = ({ images, threshold, scrollPosition }) => {
  // console.log("Current scroll position:", scrollPosition);

  return (
    <div>
      {images?.map((image, index) => (
        <div className="page-chapter" key={image}>
          <MangaImage
            key={image}
            alt={`Trang ${index}`}
            data-index={index}
            scrollPosition={scrollPosition}
            src={image}
            threshold={threshold}
          />
        </div>
      ))}
    </div>
  );
};

export default trackWindowScroll(Gallery);
