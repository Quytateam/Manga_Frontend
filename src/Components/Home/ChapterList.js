import React, { useState } from "react";
import { Link } from "react-router-dom";
import { convertToSlug, formatDate } from "../../unit/formatDate";

function ChapterList({ chapterList, nameOnUrl, dataRead, chapName }) {
  const [isShow, setIsShow] = useState(false);
  const [limit, setLimit] = useState(20);
  const toggleeShow = () => {
    setIsShow(!isShow);
    setLimit(chapterList?.length);
  };
  return (
    <div className="list-chapter mb-2" id="nt_listchapter">
      <h2 className="list-title clearfix">
        <i className="fa fa-list"></i> Danh sách chương
      </h2>
      {chapterList?.length > 0 ? (
        <>
          <div className="row heading">
            <div className="col-xs-5 no-wrap">Số chương</div>
            <div className="col-xs-4 no-wrap text-center">Cập nhật</div>
            <div className="col-xs-3 no-wrap text-center">Xem</div>
          </div>
          <nav>
            <ul className={`${isShow ? "active" : ""}`}>
              {chapterList?.slice(0, limit).map((chapter) => (
                <li className="row" key={chapter?._id}>
                  <div className="col-xs-5 chapter" key={chapter?._id}>
                    <Link
                      // className="visited"
                      className={`${
                        dataRead?.readedChapter?.includes(chapter?._id)
                          ? "visited"
                          : ""
                      }`}
                      to={`/truyen-tranh/${nameOnUrl}/${convertToSlug(
                        chapter?.chapName
                      )}/${chapter?._id}`}
                    >
                      {chapter?.chapName}
                      {chapter?.title ? `: ${chapter?.title}` : ""}{" "}
                      {chapter?.chapName === chapName && (
                        <i
                          className="fas fa-star red"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </Link>
                  </div>
                  <div className="col-xs-4 text-center no-wrap small">
                    {formatDate(chapter?.updatedAt)}
                  </div>
                  <div className="col-xs-3 text-center small">
                    {chapter?.chapterView}
                  </div>
                </li>
              ))}
            </ul>
            {chapterList?.length > 20 && isShow === false && (
              <Link onClick={toggleeShow} className="hidden view-more">
                <i className="fa fa-plus">Xem thêm</i>
              </Link>
            )}
          </nav>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChapterList;
