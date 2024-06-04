import React, { useState, useEffect, useMemo } from "react";
import Layout from "../Layout/Layout";
import { Link, useLocation } from "react-router-dom";
// import routes from "../routes.ts";
import ASearchMangaForm from "../Components/Home/ASearchMangaForm.js";
import MangaResults from "../Components/Home/MangaResults.js";
import { useDispatch, useSelector } from "react-redux";
import { getASearchMangasAction } from "../Redux/Actions/MangasActions.js";
import toast from "react-hot-toast";

function ASearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [formDataReady, setFormDataReady] = useState(false);
  const [formData, setFormData] = useState({
    genres: [],
    notgenres: [],
    minchapter: "1",
    status: "-1",
    gender: "-1",
    sort: "0",
  });
  const {
    isLoading,
    mangasASearch,
    // pages,
    // page: mangasGenrePage,
    totalMangas,
    isError,
  } = useSelector((state) => state.getMangasByASearch);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const queries = useMemo(() => {
    const query = {
      genres: formData.genres,
      notgenres: formData.notgenres,
      gender: formData.gender,
      status: formData.status,
      minchapter: formData.minchapter,
      sort: formData.sort,
      page: page + 1,
    };
    return query;
  }, [formData, page]);
  useEffect(() => {
    setIsCollapsed(location.search ? false : true);
    const fetchedFormData = {
      genres: queryParams.get("genres") || "",
      notgenres: queryParams.get("notgenres") || "",
      gender: queryParams.get("gender") || "-1",
      status: queryParams.get("status") || "-1",
      minchapter: queryParams.get("minchapter") || "1",
      sort: queryParams.get("sort") || "0",
    };
    const initialPage = parseInt(queryParams.get("page")) || 0;
    setFormData(fetchedFormData);
    setFormDataReady(true);
    setPage(initialPage - 1);
  }, [location.search, queryParams]);
  useEffect(() => {
    dispatch(getASearchMangasAction(queries));
    if (isError) {
      toast.error(isError);
    }
  }, [queries, dispatch, isError]);
  return (
    <Layout>
      <div id="ctl00_Breadcrumbs_pnlWrapper">
        <ul className="breadcrumb" itemType="http://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to="/"
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Trang chủ</span>
            </Link>
            <meta itemProp="position" content={"1"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to="/tim-truyen-nang-cao"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Tìm truyện</span>
            </Link>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="full-width col-sm-12">
          <div className="Module Module-239">
            <div className="ModuleContent">
              <div className="notify_block">
                <div className="info">
                  <em className="fa fa-info-circle" />
                </div>
                Mẹo: Nếu bạn không thích thể loại Trung Quốc có thể bỏ check{" "}
                <span className="icon-cross"> </span> Harem.{" "}
                <span style={{ color: "#ff0000" }}>Nhấn 2 lần để bỏ check</span>
              </div>
            </div>
          </div>
          <div className="Module Module-222">
            <div className="ModuleContent">
              <div className="comic-filter mrb10">
                <h1 className="text-center">Tìm truyện nâng cao</h1>
              </div>
              <div className="text-center mrb5">
                <button
                  type="button"
                  className="btn btn-info btn-collapse"
                  onClick={toggleCollapse}
                >
                  <span className={`show-text ${isCollapsed ? "hidden" : ""}`}>
                    Hiện{" "}
                  </span>
                  <span className={`hide-text ${isCollapsed ? "" : "hidden"}`}>
                    Ẩn{" "}
                  </span>
                  khung tìm kiếm{" "}
                  <i
                    className={`fa ${
                      isCollapsed
                        ? "fa-angle-double-down"
                        : "fa-angle-double-up"
                    }`}
                  />
                </button>
              </div>
              {formDataReady && (
                <ASearchMangaForm
                  isCollapsed={isCollapsed}
                  formData={formData}
                />
              )}
            </div>
          </div>
          {/* {isLoading ? (
            <></>
          ) : mangasASearch?.length > 0 ? (
            <MangaResults
              mangas={mangasASearch}
              page={page}
              totalMangas={totalMangas}
            />
          ) : (
            <></>
          )} */}
          {isLoading ? (
            <></>
          ) : (
            <MangaResults
              mangas={mangasASearch}
              page={page}
              totalMangas={totalMangas}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ASearchPage;
