import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { convertToSlug } from "../../unit/formatDate.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistoryMangasAction,
  deleteHistoryAction,
} from "../../Redux/Actions/MangasActions.js";
import toast from "react-hot-toast";

function HistoryList() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  const { isError, mangasHistory, totalMangas } = useSelector(
    (state) => state.getMangasHistory
  );
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.deleteHistory
  );
  const oldHistoryRef = useRef();
  const oldTotalRef = useRef();
  useEffect(() => {
    if (mangasHistory && mangasHistory?.length > 0) {
      oldHistoryRef.current = mangasHistory;
    }
    if (totalMangas) {
      oldTotalRef.current = totalMangas;
    }
  }, [mangasHistory, totalMangas]);

  const oldFollow = oldHistoryRef.current;
  const oldTotal = oldTotalRef.current;
  const handlePageChange = (e) => {
    setPage(e.selected);
    if (mangasHistory && e.selected !== 0) {
      navigate(`/lich-su?page=${e.selected + 1}`);
    } else {
      navigate();
    }
  };
  const removeHistory = (mangaId) => {
    dispatch(deleteHistoryAction(mangaId, page + 1));
  };
  // useEffect
  useEffect(() => {
    dispatch(getHistoryMangasAction(page + 1));
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "MANGAS_HISTORY_RESET" : "DELETE_HISTORY_RESET",
      });
    }
  }, [dispatch, isError, page, deleteError, isSuccess]);
  return (
    <>
      <div className="items visited-comics-page Module Module-273">
        <div className="row visited-list">
          {(mangasHistory || oldFollow)?.length > 0 ? (
            (mangasHistory || oldFollow)?.map((manga) => (
              <div className="item" key={manga?._id}>
                <figure className="clearfix">
                  <div className="image">
                    <Link
                      title={manga?.name}
                      to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                    >
                      <img
                        className="lazy center"
                        alt={manga?.name}
                        data-original={manga?.image}
                        src={manga?.image}
                      />
                    </Link>
                    <div className="view">
                      <button
                        href="#"
                        className="visited-remove"
                        onClick={() => removeHistory(manga?._id)}
                      >
                        <i className="fa fa-times" /> Xóa
                      </button>
                    </div>
                  </div>
                  <figcaption>
                    <h3>
                      <Link
                        title={manga?.name}
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                      >
                        {manga?.name}
                      </Link>
                    </h3>
                    <ul>
                      <li className="chapter clearfix">
                        <Link
                          to={`/truyen-tranh/${
                            manga?.nameOnUrl
                          }/${convertToSlug(manga?.chapterName)}/${
                            manga?.chapterIds
                          }`}
                        >
                          Đọc tiếp {manga?.chapterName}{" "}
                          <i className="fa fa-angle-right" />
                        </Link>
                      </li>
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
      {(totalMangas || oldTotal) > 36 && (
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
            pageCount={Math.ceil((totalMangas || oldTotal) / 36)}
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

export default HistoryList;
