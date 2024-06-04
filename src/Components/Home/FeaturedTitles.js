import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useFeaturedTitles } from "./hooks";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewWeekMangasAction } from "../../Redux/Actions/MangasActions.js";
import toast from "react-hot-toast";
// import { MangaData } from "../../Data/MangaData.js";
import { convertToSlug, formatDate } from "../../unit/formatDate.js";

function FeaturedTitles() {
  const dispatch = useDispatch();
  const { isLoading, mangasNewWeek, isError } = useSelector(
    (state) => state.getMangasNewWeek
  );
  const carouselRef = useRef(null);
  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };
  //   MangaData.map((manga) => {
  //     console.log(manga);
  //   });
  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };
  useEffect(() => {
    dispatch(getNewWeekMangasAction());
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError]);
  return (
    <div>
      <div id="ctl00_divAlt1" className="altcontent1 cmszone">
        <div className="top-comics Module Module-183">
          <div className="ModuleContent">
            <h2 className="page-title">
              Truyện đề cử <i className="fa fa-angle-right" />
            </h2>
            <div className="items-slide">
              <Slider ref={carouselRef} {...carouselSettings}>
                {isLoading ? (
                  <></>
                ) : mangasNewWeek?.length > 1 ? (
                  mangasNewWeek?.map((manga) => (
                    <div key={manga?._id} className="item px-[3.5px]">
                      <Link
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                        title={manga?.name}
                      >
                        <img
                          className="lazyOwl center"
                          src={manga?.image}
                          alt={manga?.name}
                          style={{}}
                        />
                      </Link>
                      <div className="slide-caption">
                        <h3>
                          <Link
                            to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                            title={manga?.name}
                          >
                            {manga?.name}
                          </Link>
                        </h3>
                        <Link
                          to={`/truyen-tranh/${
                            manga?.nameOnUrl
                          }/${convertToSlug(manga?.chapter[0]?.chapName)}/${
                            manga?.chapter[0]?._id
                          }`}
                          title={manga?.chapter[0]?.chapName}
                        >
                          {manga?.chapter[0]?.chapName || ""}
                        </Link>
                        <span className="time">
                          <i className="fa fa-clock-o"></i>{" "}
                          {formatDate(manga?.chapter[0]?.updatedAt)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Slider>
              <button
                className="prev"
                aria-label="Trước"
                onClick={handlePrevious}
              >
                {/* Previous */}
              </button>

              <button className="next" aria-label="Sau" onClick={handleNext}>
                {/* Next */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedTitles;
