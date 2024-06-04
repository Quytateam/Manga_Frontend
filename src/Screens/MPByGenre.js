import React, { useState, useEffect, useMemo } from "react";
import Layout from "../Layout/Layout";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { StatusData } from "../Data/StatusData";
import { SortData } from "../Data/SortData";
import SearchList from "../Components/Home/SearchList";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenreMangasAction,
  getKeywordMangasAction,
} from "../Redux/Actions/MangasActions";
import toast from "react-hot-toast";

function MPByGenre() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const { extendGenres, isLoading } = useSelector(
    (state) => state.genreGetExtend
  );
  const { genre } = useParams();
  const [selectedGenre, setSelectedGenre] = useState(genre || "tat-ca");
  const [activeStatus, setActiveStatus] = useState(
    queryParams.get("status") || "-1"
  );
  const [selectedSort, setSelectedSort] = useState(
    queryParams.get("sort") || "0"
  );
  const {
    isLoading: mangasGenreLoading,
    mangasGenre,
    // pages,
    // page: mangasGenrePage,
    totalMangas,
    isError,
  } = useSelector((state) => state.getMangasByGenre);
  const {
    isLoading: mangasKewordLoading,
    mangasKeyword,
    // pages,
    // page: mangasGenrePage,
    totalMangas: keywordTotalMangas,
    keywordError,
  } = useSelector((state) => state.getMangasByKeyword);
  const keyExist = queryParams.get("keyword") || "";
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    if (e.target.value !== "tat-ca") {
      navigate(`/the-loai/${e.target.value}`);
    } else {
      navigate("/the-loai");
    }
  };
  const getGenre = (selectedGenre) => {
    if (selectedGenre === "tat-ca") {
      return null;
    } else {
      const genre = extendGenres?.find(
        (genre) => genre?.nameOnUrl === selectedGenre
      );
      // if (genre === undefined) navigate();
      return genre?.name;
    }
  };
  const getDescription = (selectedGenre) => {
    if (selectedGenre === "tat-ca") {
      return null;
    } else {
      const genre = extendGenres?.find(
        (genre) => genre?.nameOnUrl === selectedGenre
      );
      return genre || genre?.desc !== "" ? genre?.desc : null;
    }
  };
  const handleStatusClick = (status) => {
    setActiveStatus(status); // Cập nhật tab đang được chọn khi người dùng nhấp vào
  };
  const handleSortClick = (e) => {
    setSelectedSort(e.target.value);
    navigate(navigationUrl(activeStatus, e.target.value));
  };
  const navigationUrl = (status, sort) => {
    if (selectedGenre !== "tat-ca") {
      return status === "-1" && sort === "0"
        ? `/the-loai/${selectedGenre}`
        : `/the-loai/${selectedGenre}?status=${status}&sort=${sort}`;
    } else {
      return status === "-1" && sort === "0"
        ? `/the-loai`
        : `/the-loai?status=${status}&sort=${sort}`;
    }
  };
  // queries
  const queries = useMemo(() => {
    const query =
      keyExist === ""
        ? {
            genre: selectedGenre === "tat-ca" ? null : selectedGenre,
            status: activeStatus,
            sort: selectedSort,
            page: page + 1,
          }
        : {
            keyword: keyExist,
            page: page + 1,
          };
    return query;
  }, [selectedGenre, activeStatus, selectedSort, page, keyExist]);
  useEffect(() => {
    const g = extendGenres?.find((g) => g?.nameOnUrl === genre);
    if (isLoading === false)
      if (g === undefined && genre !== undefined) navigate("/notpound");
    // if (g === undefined && genre !== undefined) navigate("/notpound");
    const newGenre = genre || "tat-ca";
    const newStatus = queryParams.get("status") || "-1";
    const newSort = queryParams.get("sort") || "0";
    const initialPage = parseInt(queryParams.get("page")) || 0;
    setSelectedGenre(newGenre);
    setActiveStatus(newStatus);
    setSelectedSort(newSort);
    setPage(initialPage - 1);
  }, [genre, location.search, queryParams, extendGenres, navigate, isLoading]);
  useEffect(() => {
    if (keyExist === "") dispatch(getGenreMangasAction(queries));
    else dispatch(getKeywordMangasAction(queries));
    if (isError || keywordError) {
      toast.error(isError || keywordError);
    }
  }, [queries, dispatch, isError, keywordError, keyExist]);
  return (
    <Layout>
      <div
        className={`main ${
          extendGenres?.length > 0 ? "min-h-400" : "min-h-screen"
        }`}
      >
        <div id="ctl00_Breadcrumbs_pnlWrapper">
          <ul
            className="breadcrumb"
            itemType="http://schema.org/BreadcrumbList"
          >
            <li
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <NavLink
                to="/"
                className="itemcrumb"
                itemProp="item"
                itemType="http://schema.org/Thing"
              >
                <span itemProp="name">Trang chủ</span>
              </NavLink>
              <meta itemProp="position" content={"1"} />
            </li>
            <li
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <NavLink
                to="/the-loai"
                className="itemcrumb active"
                itemProp="item"
                itemType="http://schema.org/Thing"
              >
                <span itemProp="name">Thể loại</span>
              </NavLink>
              <meta itemProp="position" content={"2"} />
            </li>
          </ul>
        </div>
        <div className="row">
          <div id="ctl00_divCenter" className="center-side col-md-8">
            <div className="Module Module-246">
              <div className="ModuleContent">
                <div
                  id="ctl00_mainContent_ctl00_divBasicFilter"
                  className="comic-filter"
                >
                  <h1 className="text-center">
                    {selectedGenre === "tat-ca" ? (
                      "Tìm truyện tranh"
                    ) : (
                      <>
                        Truyện thể loại{" "}
                        <strong className="font-bold">
                          {getGenre(selectedGenre)}
                        </strong>
                      </>
                    )}
                  </h1>
                  {isLoading ? (
                    <></>
                  ) : extendGenres?.length > 0 ? (
                    <div className="dropdown-genres mrt10 mrb10 visible-sm visible-xs">
                      <select
                        className="form-control changed-redirect"
                        defaultValue={selectedGenre}
                        onChange={handleGenreChange}
                      >
                        <option value="tat-ca">Tất cả thể loại</option>
                        {extendGenres?.map((genre) => (
                          <option key={genre?._id} value={genre?.nameOnUrl}>
                            {genre?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <></>
                  )}

                  {keyExist === "" && (
                    <>
                      {getDescription(selectedGenre) && (
                        <div
                          id="ctl00_mainContent_ctl00_divDescription"
                          className="description"
                        >
                          <div className="info">
                            {getDescription(selectedGenre)}
                          </div>
                        </div>
                      )}
                      <ul
                        id="ctl00_mainContent_ctl00_ulStatus"
                        className="nav nav-tabs"
                      >
                        {StatusData.map((s) => (
                          <li
                            key={s.value}
                            className={activeStatus === s.value ? "active" : ""}
                          >
                            <Link
                              className={`nav-link status mx-1 ${
                                activeStatus === s.value ? "active" : ""
                              }`}
                              onClick={() => handleStatusClick(s.value)} // Xử lý sự kiện click để cập nhật tab đang được chọn
                              to={navigationUrl(s.value, selectedSort)}
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div
                        id="ctl00_mainContent_ctl00_divSort"
                        className="sort-by row"
                      >
                        <div className="col-sm-3 mrt5 mrb5">Sắp xếp theo:</div>
                        <div className="col-sm-9">
                          <div className="hidden-xs">
                            {SortData.map((s) => (
                              <Link
                                className={`mx-1 ${
                                  selectedSort === s.value ? "active" : ""
                                }`}
                                key={s.value}
                                to={navigationUrl(activeStatus, s.value)}
                              >
                                {s.label}
                              </Link>
                            ))}
                          </div>
                          <select
                            defaultValue={selectedSort}
                            className="visible-xs form-control changed-redirect"
                            onChange={handleSortClick}
                          >
                            {SortData.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {mangasGenreLoading || mangasKewordLoading ? (
              <></>
            ) : mangasGenre?.length > 0 || mangasKeyword?.length > 0 ? (
              <SearchList
                mangas={keyExist === "" ? mangasGenre : mangasKeyword}
                page={page}
                totalMangas={keyExist === "" ? totalMangas : keywordTotalMangas}
                selectedGenre={selectedGenre}
              />
            ) : (
              <></>
            )}
          </div>
          <div id="ctl00_divRight" className="right-side col-md-4 cmszone">
            <div className="box darkBox genres hidden-sm hidden-xs Module Module-248">
              <div className="ModuleContent">
                <h2 className="module-name">
                  <b>Thể loại</b>
                </h2>
                <ul className="nav">
                  <li className={selectedGenre === "tat-ca" ? "active" : ""}>
                    <Link to="/the-loai">Tất cả thể loại</Link>
                  </li>
                  {isLoading ? (
                    <></>
                  ) : extendGenres?.length > 0 ? (
                    extendGenres?.map((genre) => (
                      <li
                        key={genre?._id}
                        className={
                          selectedGenre === genre?.nameOnUrl ? "active" : ""
                        }
                      >
                        <Link to={`/the-loai/${genre?.nameOnUrl}`}>
                          {genre?.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MPByGenre;
