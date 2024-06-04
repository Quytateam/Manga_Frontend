import React from "react";
import LazyImages from "./LazyImages";
import useWindowSize from "../../hooks/useWindowSize";

function ChapterPages({ images }) {
  // items visited-comics-page
  const { height } = useWindowSize();
  return (
    <div
      className={`reading-detail box_doc ${
        images?.length > 0 ? "" : "min-h-screen"
      }`}
    >
      <LazyImages images={images} threshold={(height || 1000) * 3} />
    </div>
  );
}

export default ChapterPages;
