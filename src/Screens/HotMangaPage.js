import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FeaturedTitles from "../Components/Home/FeaturedTitles";
import { MangaData } from "../Data/MangaData";
import HotManga from "../Components/Home/HotManga";
import TopTitles from "../Components/Home/TopTitles";
import { useDispatch, useSelector } from "react-redux";
import { getHotMangasAction } from "../Redux/Actions/MangasActions";
import toast from "react-hot-toast";

function HotMangaPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const initialPage = parseInt(queryParams.get("page")) || 0;
  const [page, setPage] = useState(initialPage - 1);
  useEffect(() => {
    const initialPage = parseInt(queryParams.get("page")) || 0;
    setPage(initialPage - 1);
  }, [location.search, queryParams, navigate]);
  const {
    isLoading,
    mangasHot,
    // pages,
    // page: mangasGenrePage,
    totalMangas,
    isError,
  } = useSelector((state) => state.getMangasHot);
  useEffect(() => {
    dispatch(getHotMangasAction(page + 1));
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, page, isError]);
  return (
    <Layout>
      <div id="ctl00_Breadcrumbs_pnlWrapper">
        <ul className="breadcrumb" itemType="http://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
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
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <NavLink
              to="/hot"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Hot</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <FeaturedTitles mangas={MangaData} />
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          <div className={`items visited-comics-page Module Module-163`}>
            {isLoading ? (
              <></>
            ) : (
              <HotManga
                mangas={mangasHot}
                page={page}
                totalMangas={totalMangas}
              />
            )}
          </div>
        </div>
        <div className="right-side col-md-4 cmszone" id="ctl00_divRight">
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default HotMangaPage;
