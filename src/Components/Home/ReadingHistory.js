import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import routes from "../../routes.ts";
import { MangaData } from "../../Data/MangaData.js";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryMangasAction } from "../../Redux/Actions/MangasActions.js";
import toast from "react-hot-toast";
import { convertToSlug } from "../../unit/formatDate.js";

function ReadingHistory() {
  const dispatch = useDispatch();
  const {
    isLoading,
    mangasHistory,
    // pages,
    // page: mangasGenrePage,
    totalMangas,
    isError,
  } = useSelector((state) => state.getMangasHistory);
  useEffect(() => {
    dispatch(getHistoryMangasAction());
    if (isError) {
      toast.error(isError);
      // dispatch({
      //   type: "MANGAS_HISTORY_RESET",
      // });
    }
  }, [dispatch, isError]);
  return (
    <>
      {isLoading ? (
        <></>
      ) : mangasHistory?.length > 0 ? (
        <div className="visited-comics">
          <div className="box darkBox">
            <h2>
              Lịch sử đọc truyện
              <NavLink className="view-all" to="/lich-su">
                Xem tất cả
              </NavLink>
            </h2>
            <ul className="list-unstyled">
              {mangasHistory?.slice(0, 5).map((manga) => (
                <li className="clearfix" key={manga?._id}>
                  <div className="t-item">
                    <Link
                      className="thumb"
                      title={manga?.name}
                      to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                    >
                      <img
                        className="center"
                        alt={manga?.name}
                        data-original={manga?.image}
                        src={manga?.image}
                      />
                    </Link>
                    <h3 className="title">
                      <Link
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                      >
                        {manga?.name}
                      </Link>
                    </h3>
                    <p className="chapter">
                      <Link
                        to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
                          manga?.chapterName
                        )}/${manga?.chapterIds}`}
                      >
                        Đọc tiếp {manga?.chapterName}{" "}
                        <i className="fa fa-angle-right" />
                      </Link>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ReadingHistory;
