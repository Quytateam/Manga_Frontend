import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import { formatDate, convertToSlug } from "../../unit/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { getFollowMangasAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function FollowList() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  const { isLoading, isError, followMangas, totalMangas } = useSelector(
    (state) => state.userGetFollowMangas
  );
  const handlePageChange = (e) => {
    setPage(e.selected);
    if (followMangas && e.selected !== 0) {
      navigate(`/theo-doi?page=${e.selected + 1}`);
    } else {
      navigate();
    }
  };
  // useEffect
  useEffect(() => {
    dispatch(getFollowMangasAction(page + 1));
    if (isError) {
      toast.error(isError);
      dispatch({
        type: isError
          ? "GET_FOLLOW_MANGAS_RESET"
          : "DELETE_FOLLOW_MANGAS_RESET",
      });
    }
  }, [dispatch, isError, page]);
  return (
    <>
      <div className="items visited-comics-page Module Module-273">
        <div className="row visited-list">
          {isLoading ? (
            <></>
          ) : followMangas?.length > 0 ? (
            followMangas?.map((manga) => (
              <div className="item" key={manga?._id}>
                <figure className="clearfix">
                  <div className="image">
                    <Link
                      title={manga?.name}
                      to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                    >
                      <img
                        src={manga?.image}
                        className="lazy center"
                        data-original={manga?.image}
                        alt={manga?.name}
                      />
                    </Link>
                    <div className="view clearfix">
                      <span className="pull-left">
                        <i className="fa fa-eye"></i>
                        {(manga &&
                          Math.round((manga?.numberOfViews || 0) * 10) / 10) ||
                          "N/A"}{" "}
                        <i className="fa fa-comment" />
                        {(manga &&
                          Math.round((manga?.numberOfComments || 0) * 10) /
                            10) ||
                          "N/A"}{" "}
                        <i className="fa fa-heart" />
                        {(manga &&
                          Math.round((manga?.numberOfFollows || 0) * 10) /
                            10) ||
                          "N/A"}{" "}
                      </span>
                    </div>
                  </div>
                  <figcaption>
                    <h3>
                      <Link
                        className="jtip"
                        data-jtip={`#truyen-tranh-${manga?._id}`}
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                      >
                        {manga?.name}
                      </Link>
                    </h3>
                    <ul className="comic-item">
                      {manga?.chapter?.map((chap) => (
                        <li
                          className="flex gap-x-1 items-center justify-between"
                          key={chap?._id}
                        >
                          <Link
                            to={`/truyen-tranh/${
                              manga?.nameOnUrl
                            }/${convertToSlug(chap?.chapName)}/${chap?._id}`}
                            title={chap?.chapName}
                            className="flex-grow text-[13px] whitespace-nowrap overflow-hidden !text-white text-ellipsis"
                          >
                            {chap?.chapName}
                          </Link>
                          <i className="text-[11px] text-[#999] italic leading-[13px] whitespace-nowrap">
                            {formatDate(chap?.updatedAt)}
                          </i>
                        </li>
                      ))}
                    </ul>
                  </figcaption>
                </figure>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      {totalMangas > 36 && (
        <div
          id="ctl00_mainContent_ctl00_divPager"
          className="pagination-outter"
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            // onPageChange={(event) => {
            //   setPage(event.selected);
            // }}
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(totalMangas / 36)}
            // pageCount={Math.ceil(total / chaptersPerPage)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            pageClassName="text-center"
            containerClassName="pagination"
            activeClassName="active"
            previousClassName="text-center"
            nextClassName="text-center"
            breakClassName="text-center"
            forcePage={page}
          />
        </div>
      )}
    </>
  );
}

export default FollowList;
