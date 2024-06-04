import React from "react";
// import { MangaData } from "../../Data/MangaData";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import { convertToSlug, formatDate } from "../../unit/formatDate";

function MangaResults({ mangas, page, totalMangas }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const initialPage = parseInt(queryParams.get("page")) || 0;
  // const [page, setPage] = useState(initialPage - 1);
  //   console.log(location.search === "");
  const handlePageChange = (e) => {
    // setPage(e.selected);
    const pageIndex = location.search.indexOf("page=");
    const locationSearch =
      pageIndex !== -1
        ? location.search.substring(0, pageIndex - 1)
        : location.search;
    if (mangas && e.selected !== 0) {
      if (queryParams.get("sort") == null)
        navigate(`/tim-truyen-nang-cao?page=${e.selected + 1}`);
      else {
        navigate(
          `/tim-truyen-nang-cao${locationSearch}&page=${e.selected + 1}`
        );
      }
    } else {
      navigate(`/tim-truyen-nang-cao${locationSearch}`);
    }
  };
  // useEffect(() => {
  //   setPage(initialPage - 1);
  // }, [location.search, initialPage]);
  return (
    <div
      className={`Module Module-223 ${
        mangas.length > 0 ? "min-h-0" : "min-h-screen"
      }`}
      id="results"
    >
      {mangas?.length > 0 ? (
        <div className="ModuleContent">
          <div className="items">
            <div className="row">
              {mangas.map((manga) => (
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
                          <i className="fa fa-star"></i>
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
                  {/* <div
                      className="box_tootip"
                      style={{ display: "none" }}
                      id="truyen-tranh-81754"
                    >
                      <div className="box_li">
                        <div className="title">{manga?.name}</div>
                      </div>
                    </div> */}
                </div>
              ))}
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default MangaResults;
