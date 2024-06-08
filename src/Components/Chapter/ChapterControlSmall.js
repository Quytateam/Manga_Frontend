import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { convertToSlug } from "../../unit/formatDate";

function ChapterControlSmall({ manga, prevChapter, nextChapter }) {
  const { chapid } = useParams();
  const chapter = manga?.chapter?.find((item) => item?._id === chapid);

  const [canPrev, setCanPrev] = useState(prevChapter !== null);
  const [canNext, setCanNext] = useState(nextChapter !== null);
  useEffect(() => {
    setCanPrev(prevChapter !== null);
    setCanNext(nextChapter !== null);
  }, [manga, chapid, prevChapter, nextChapter]);
  return (
    <div className="container">
      <div className="top bottom">
        <div className="chapter-nav-bottom text-center" id="chapterNavBottom">
          <Link
            className={`btn btn-danger prev ${
              canPrev ? "" : "disabled pointer-events-none"
            }`}
            to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
              prevChapter?.chapName
            )}/${prevChapter?._id}`}
          >
            <em className="fa fa-chevron-left"></em> Chap trước
          </Link>{" "}
          <Link
            className={`btn btn-danger next ${
              canNext ? "" : "disabled pointer-events-none"
            }`}
            to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
              nextChapter?.chapName
            )}/${nextChapter?._id}`}
          >
            Chap sau <em className="fa fa-chevron-right"></em>
          </Link>
        </div>
        <ul className="breadcrumb" itemType="http://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to="/"
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Trang chủ</span>
            </Link>
            <meta itemProp="position" content={"1"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to="/the-loai"
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Thể loại</span>
            </Link>
            <meta itemProp="position" content={"2"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              {manga?.name}
            </Link>
            <meta itemProp="position" content={"3"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
                chapter?.chapName
              )}/${chapid}`}
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">{chapter?.chapName}</span>
            </Link>
            <meta itemProp="position" content={"4"} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChapterControlSmall;
