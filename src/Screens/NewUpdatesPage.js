import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import FeaturedTitles from "../Components/Home/FeaturedTitles";
import NewUpdates from "../Components/Home/NewUpdates";
import { MangaData } from "../Data/MangaData";
import ReadingHistory from "../Components/Home/ReadingHistory";
import TopTitles from "../Components/Home/TopTitles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getNewUpdateMangasAction } from "../Redux/Actions/MangasActions";

function NewUpdatesPage() {
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
    mangasNewUpdate,
    // pages,
    // page: mangasGenrePage,
    totalMangas,
    isError,
  } = useSelector((state) => state.getMangasNewUpdate);
  useEffect(() => {
    dispatch(getNewUpdateMangasAction(page + 1));
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, page, isError]);
  return (
    <Layout>
      <FeaturedTitles mangas={MangaData} />
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          {isLoading ? (
            <></>
          ) : (
            <NewUpdates
              mangas={mangasNewUpdate}
              page={page}
              totalMangas={totalMangas}
            />
          )}
        </div>
        <div className="right-side col-md-4 cmszone" id="ctl00_divRight">
          <ReadingHistory />
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default NewUpdatesPage;
