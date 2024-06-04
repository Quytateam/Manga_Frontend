import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopMonthMangasAction } from "../../Redux/Actions/MangasActions.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { convertToSlug } from "../../unit/formatDate.js";

function TopTitles() {
  const dispatch = useDispatch();
  const { isLoading, mangasTopMonth, isError } = useSelector(
    (state) => state.getMangasTopMonth
  );
  useEffect(() => {
    dispatch(getTopMonthMangasAction());
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError]);
  return (
    <div className="comic-wrap Module Module-168">
      <div className="ModuleContent">
        <div className="box-tab box darkBox">
          <ul className="tab-nav clearfix">
            <li>
              <Link
                rel="nofollow"
                title="BXH truyện tranh theo tháng"
                className="active"
                to="/the-loai?status=-1&sort=11"
              >
                Top Tháng
              </Link>
            </li>
            <li>
              <Link
                rel="nofollow"
                title="BXH truyện tranh theo tuần"
                to="/the-loai?status=-1&sort=12"
              >
                Top Tuần
              </Link>
            </li>
            <li>
              <Link
                rel="nofollow"
                title="BXH truyện tranh theo ngày"
                to="/the-loai?status=-1&sort=13"
              >
                Top Ngày
              </Link>
            </li>
          </ul>
          <div className="tab-pane">
            <div id="topMonth">
              <ul className="list-unstyled">
                {isLoading ? (
                  <></>
                ) : mangasTopMonth?.length > 0 ? (
                  mangasTopMonth?.map((manga, index) => (
                    <li className="clearfix" key={manga?._id}>
                      <span className={`txt-rank fn-order pos${index + 1}`}>
                        0{index + 1}
                      </span>
                      <div className="t-item comic-item" data-id={17696}>
                        <Link
                          className="thumb"
                          title={manga?.name}
                          to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                        >
                          <img
                            className="lazy center"
                            src={manga?.image}
                            alt={manga?.name}
                          />
                        </Link>
                        <h3 className="title">
                          <Link
                            to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                          >
                            {manga?.name}
                          </Link>
                        </h3>
                        <p className="chapter top">
                          <Link
                            title={manga?.chapter[0]?.chapName}
                            to={`/truyen-tranh/${
                              manga?.nameOnUrl
                            }/${convertToSlug(manga?.chapter[0]?.chapName)}/${
                              manga?.chapter[0]?._id
                            }`}
                          >
                            {manga?.chapter[0]?.chapName}{" "}
                            {manga?.chapter[0]?.title &&
                              ` - ${manga?.chapter[0]?.title}`}
                          </Link>
                          <span className="view pull-right">
                            <i className="fa fa-eye"></i>
                            {(manga &&
                              Math.round((manga?.numberOfViews || 0) * 10) /
                                10) ||
                              "N/A"}{" "}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div id="topWeek"></div>
            <div id="topDay"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopTitles;
