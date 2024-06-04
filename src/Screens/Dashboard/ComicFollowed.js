import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowMangasAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { formatDate, convertToSlug } from "../../unit/formatDate";
import { deleteFollowManga } from "../../Context/Functionalities";

function ComicFollowed() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  const { isError, followMangas, totalMangas } = useSelector(
    (state) => state.userGetFollowMangas
  );
  const oldFollowRef = useRef();
  const oldTotalRef = useRef();
  useEffect(() => {
    if (followMangas && followMangas?.length > 0) {
      oldFollowRef.current = followMangas;
    }
    if (totalMangas) {
      oldTotalRef.current = totalMangas;
    }
  }, [followMangas, totalMangas]);

  const oldFollow = oldFollowRef.current;
  const oldTotal = oldTotalRef.current;
  const handlePageChange = (e) => {
    setPage(e.selected);
    if (followMangas && e.selected !== 0) {
      navigate(`/secure/ComicFollowed?page=${e.selected + 1}`);
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
      <section className="comics-followed comics-followed-withpaging user-table clearfix">
        {/* <div className="alert alert-success">
          Truyện chưa đọc sẽ hiển thị ở đầu danh sách, nhấn vào "Đã đọc" nếu
          truyện đọc rồi.
        </div> */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="nowrap">Tên truyện</th>
                <th className="nowrap">Xem gần nhất</th>
                <th className="nowrap">Chap mới nhất</th>
              </tr>
            </thead>
            <tbody>
              {(followMangas || oldFollow)?.length > 0 ? (
                (followMangas || oldFollow)?.map((manga) => (
                  <tr key={manga?._id} className="unread">
                    <td>
                      <Link
                        className="image"
                        title={manga?.name}
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                      >
                        <img
                          src={manga?.image}
                          className="lazy"
                          data-original={manga?.image}
                          alt={manga?.name}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="comic-name"
                        title={manga?.name}
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                      >
                        {manga?.name}
                      </Link>
                      <div className="follow-action">
                        {/* <Link className="mark-as-read" data-id="20857">
                          <i className="fa fa-check"></i> Đã đọc
                        </Link> */}
                        <Link
                          className="follow-link"
                          data-id="20857"
                          data-key="a96f7c8f-f7dc-b375-bdef-ce7b9210e0a4"
                          onClick={() =>
                            deleteFollowManga(
                              manga?._id,
                              dispatch,
                              manga?.nameOnUrl + "-" + manga?._id
                            )
                          }
                        >
                          <i className="fa fa-times"></i> Bỏ theo dõi
                        </Link>
                      </div>
                    </td>
                    <td className="nowrap chapter">
                      <Link
                        className="visited"
                        to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
                          manga?.chapterNameReading
                        )}/${manga?.readChapter}`}
                        title={manga?.chapterNameReading}
                      >
                        {manga?.chapterNameReading}
                      </Link>
                      <br />
                      <time className="time">
                        {manga?.chapterNameReading
                          ? formatDate(manga?.lastRead)
                          : ""}
                      </time>
                    </td>
                    <td className="nowrap chapter">
                      {manga?.chapter?.length > 0 && (
                        <>
                          <Link
                            to={`/truyen-tranh/${
                              manga?.nameOnUrl
                            }/${convertToSlug(manga?.chapter[0].chapName)}/${
                              manga?.chapter[0]._id
                            }`}
                          >
                            {manga?.chapter[0]?.chapName}
                          </Link>
                          <br />
                          <time className="time">
                            {formatDate(manga?.chapter[0].updatedAt)}
                          </time>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        {(totalMangas || oldTotal) > 36 && (
          <div className="pagination-outter">
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
      </section>
    </>
  );
}

export default ComicFollowed;
