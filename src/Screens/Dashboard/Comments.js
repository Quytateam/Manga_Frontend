import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommentMangasAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { formatDate } from "../../unit/formatDate";

function Comments() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  const { isLoading, isError, commentMangas, totalComment } = useSelector(
    (state) => state.userGetCommentMangas
  );
  const handlePageChange = (e) => {
    setPage(e.selected);
    if (commentMangas && e.selected !== 0) {
      navigate(`/secure/Comments?page=${e.selected + 1}`);
    } else {
      navigate();
    }
  };
  // useEffect
  useEffect(() => {
    dispatch(getCommentMangasAction(page + 1));
    if (isError) {
      toast.error(isError);
      dispatch({
        type: isError
          ? "GET_COMMENT_MANGAS_RESET"
          : "DELETE_COMMENT_MANGAS_RESET",
      });
    }
  }, [dispatch, isError, page]);
  return (
    <section className="user-table clearfix">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="nowrap">Tên truyện</th>
              <th className="nowrap">Thời gian</th>
              <th className="nowrap">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <></>
            ) : commentMangas?.length > 0 ? (
              commentMangas.map((comment) => (
                <tr key={comment?._id}>
                  <td>
                    <Link
                      to={`/truyen-tranh/${comment?.mangaNameOnUrl}-${comment?.mangaId}`}
                      rel="nofollow"
                      className="image"
                    >
                      <img
                        alt="test"
                        className="lazy"
                        data-original={comment?.mangaImage}
                        src={comment?.mangaImage}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      rel="nofollow"
                      to={`/truyen-tranh/${comment?.mangaNameOnUrl}-${comment?.mangaId}`}
                    >
                      {comment?.mangaName}
                    </Link>
                  </td>
                  <td className="nowrap">
                    <time className="time">
                      {formatDate(comment?.createdAt)}
                    </time>
                  </td>
                  <td>
                    <div className="word-wrap">{comment?.commentContent}</div>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      {totalComment > 36 && (
        <div className="pagination-outter">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            // onPageChange={(event) => {
            //   setPage(event.selected);
            // }}
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(totalComment / 36)}
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
    </section>
  );
}

export default Comments;
