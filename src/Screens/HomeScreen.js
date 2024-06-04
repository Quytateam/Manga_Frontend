import React, { useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import FeaturedTitles from "../Components/Home/FeaturedTitles";
import NewUpdates from "../Components/Home/NewUpdates";
import ReadingHistory from "../Components/Home/ReadingHistory";
import TopTitles from "../Components/Home/TopTitles";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendMangasAction } from "../Redux/Actions/MangasActions";
import toast from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();
  const { mangasRecommend, isError } = useSelector(
    (state) => state.getMangasRecommend
  );
  const oldRecommendRef = useRef();
  useEffect(() => {
    if (mangasRecommend && mangasRecommend?.length > 0) {
      oldRecommendRef.current = mangasRecommend;
    }
  }, [mangasRecommend]);

  const oldRecommend = oldRecommendRef.current;
  useEffect(() => {
    dispatch(getRecommendMangasAction());
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError]);
  return (
    <Layout>
      <FeaturedTitles />
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          <NewUpdates mangas={mangasRecommend || oldRecommend} />
        </div>
        <div className="right-side col-md-4 cmszone" id="ctl00_divRight">
          <ReadingHistory />
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default HomeScreen;
