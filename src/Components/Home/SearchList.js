import React from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import { convertToSlug, formatDate } from "../../unit/formatDate.js";

function SearchList({ mangas, page, totalMangas, selectedGenre }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const initialPage = parseInt(localsearch.get("page")) || 0;
  // const [page, setPage] = useState(initialPage - 1);
  const handlePageChange = (e) => {
    const pageIndex = location.search.indexOf("page=");
    const locationSearch =
      pageIndex !== -1
        ? location.search.substring(0, pageIndex - 1)
        : location.search;
    const genrer = selectedGenre === "tat-ca" ? "" : `/${selectedGenre}`;
    if (mangas && e.selected !== 0) {
      if (queryParams.get("sort") == null && queryParams.get("keyword") == null)
        navigate(`/the-loai${genrer}?page=${e.selected + 1}`);
      else {
        navigate(`/the-loai${genrer}${locationSearch}&page=${e.selected + 1}`);
      }
    } else {
      navigate(`/the-loai${genrer}${locationSearch}`);
    }
  };
  return (
    <div className="Module Module-247">
      <div className="ModuleContent">
        <div className="items">
          <div className="row">
            {mangas?.map((manga) => (
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
                          className="chapter clearfix flex gap-x-1 items-center justify-between"
                          key={chap?._id}
                        >
                          <Link
                            to={`/truyen-tranh/${
                              manga?.nameOnUrl
                            }/${convertToSlug(chap?.chapName)}/${chap?._id}`}
                            title={chap?.chapName}
                            className="flex-grow text-[13px] whitespace-nowrap overflow-hidden text-ellipsis"
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
                <div
                  className="box_tootip"
                  style={{ display: "none" }}
                  id="truyen-tranh-83823"
                >
                  <div className="box_li">
                    <div className="title">Anh Chồng Giàu Có Chiều Hư Tôi</div>
                    <div className="clearfix">
                      <div className="box_img">
                        <a title="Anh Chồng Giàu Có Chiều Hư Tôi" href={`dddd`}>
                          <img
                            className="img_a"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            // data-original={coverArt}
                            alt="Anh Chồng Giàu Có Chiều Hư Tôi"
                          />
                        </a>
                      </div>
                      <div className="message_main">
                        <p>
                          <label>Thể loại:</label>Drama, Manhua, Ngôn Tình,
                          Truyện Màu
                        </p>
                        <p>
                          <label>Tình trạng:</label>Đang tiến hành
                        </p>
                        <p>
                          <label>Lượt xem:</label>235K
                        </p>
                        <p>
                          <label>Bình luận:</label>78
                        </p>
                        <p>
                          <label>Theo dõi:</label>4.906
                        </p>
                        <p>
                          <label>Ngày cập nhật:</label>29 phút trước
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(totalMangas / 36)}
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

export default SearchList;
