import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { convertToSlug, formatDate } from "../../unit/formatDate";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function GenderManga({ mangas, title, gender, page, totalMangas }) {
  const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const initialPage = parseInt(queryParams.get("page")) || 0;
  // const [page, setPage] = useState(initialPage - 1);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handlePageChange = (e) => {
    // setPage(e.selected);
    if (mangas && e.selected !== 0) {
      navigate(`/${gender}?page=${e.selected + 1}`);
    } else {
      navigate();
    }
  };
  return (
    <div
      className={`${
        mangas?.length > 0 ? "" : "items visited-comics-page"
      } Module Module-163`}
    >
      <div className="ModuleContent">
        <div className="items">
          <div className="relative">
            <h1 className="page-title">
              {title} <i className="fa fa-angle-right" />
            </h1>
          </div>
          <div className="row">
            {mangas?.length > 0 ? (
              mangas?.map((manga) => (
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
                          data-original={manga?.img}
                          alt={manga?.name}
                        />
                      </Link>
                      <span className="icon icon-hot"></span>
                      <div className="view clearfix">
                        <span className="pull-left">
                          <i className="fa fa-eye"></i>
                          {(manga &&
                            Math.round((manga?.numberOfViews || 0) * 10) /
                              10) ||
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
                        {manga?.chapter.map((chap) => (
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
      </div>
    </div>
  );
}

export default GenderManga;
