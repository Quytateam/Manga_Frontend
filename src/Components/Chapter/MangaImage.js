import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MangaImage({
  className = "",
  disabledEffect = false,
  effect = "opacity",
  index = 0,
  threshold = 0,
  ...other
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={`leading-0 block overflow-hidden ${
        loaded ? "min-h-0" : "min-h-[100vh]"
      } wrapper:w-full wrapper:h-full wrapper:!bg-cover ${className}`}
    >
      <LazyLoadImage
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={"/images/loading.jpg"}
        className="w-full h-full object-cover"
        afterLoad={() => setLoaded(true)}
        threshold={threshold}
        {...other}
      />
    </span>
  );
}
