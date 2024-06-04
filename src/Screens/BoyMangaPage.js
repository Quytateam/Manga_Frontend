import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FeaturedTitles from "../Components/Home/FeaturedTitles";
import { MangaData } from "../Data/MangaData";
import TopTitles from "../Components/Home/TopTitles";
import GenderManga from "../Components/Home/GenderManga";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getGenderMangasAction } from "../Redux/Actions/MangasActions";

function BoyMangaPage() {
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
    mangasGender,
    // pages,
    // page: mangasGenrePage,
    totalMangas,
    isError,
  } = useSelector((state) => state.getMangasByGender);
  useEffect(() => {
    dispatch(
      getGenderMangasAction({ gender: "truyen-con-trai", page: page + 1 })
    );
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
              to="/truyen-con-trai"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Con trai</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <FeaturedTitles mangas={MangaData} />
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          {isLoading ? (
            <></>
          ) : (
            <GenderManga
              mangas={mangasGender}
              title="Truyện con trai"
              gender="truyen-con-trai"
              page={page}
              totalMangas={totalMangas}
            />
          )}
        </div>
        <div className="right-side col-md-4 cmszone" id="ctl00_divRight">
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default BoyMangaPage;
