import React, { useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import ChapterControl from "../Components/Chapter/ChapterControl";
import ChapterPages from "../Components/Chapter/ChapterPages";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addHistoryAction,
  getChapterByIdAction,
} from "../Redux/Actions/MangasActions";
import CommentList from "../Components/SingleManga/CommentList";
import {
  autoTimeReadAction,
  stopCronJobAction,
} from "../Redux/Actions/userActions";

function ReadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { manganame, chapname, chapid } = useParams();
  const { isLoading, isError, manga, prevChapter, nextChapter, chapter } =
    useSelector((state) => state.getChapterById);
  // const ws = useRef(null);
  const oldMangaRef = useRef();
  const isMounted = useRef(false);
  const isInPage = useRef(true);
  const isChapId = useRef(chapid);
  useEffect(() => {
    if (manga && Object.keys(manga).length > 0) {
      oldMangaRef.current = manga;
    }
  }, [manga]);
  const oldManga = oldMangaRef.current;

  useEffect(() => {
    if (isMounted.current) {
      return () => {
        if (userInfo?.token) {
          isInPage.current = false;
          isMounted.current = false;
          dispatch(stopCronJobAction());
          dispatch({ type: "AUTO_TIME_READ_RESET" });
        }
      };
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (!isMounted.current || isChapId.current !== chapid) {
      dispatch(addHistoryAction(manganame, chapname, chapid));
      dispatch(getChapterByIdAction(manganame, chapname, chapid));
      if (userInfo?.token) {
        isInPage.current = true;
        dispatch(autoTimeReadAction(manganame, chapname, chapid));
      }
      isMounted.current = true;
      isChapId.current = chapid;
    }
  }, [dispatch, manganame, chapname, chapid, chapter, userInfo]);

  useEffect(() => {
    if (isError) {
      // toast.error(isError);
      navigate("/notpound");
    }
  }, [isError, navigate]);

  useEffect(() => {
    // const handleFocus = () => {
    //   setTimeout(() => {
    //     if (userInfo?.token && isInPage.current) {
    //       dispatch(autoTimeReadAction(manganame, chapname, chapid));
    //     }
    //   }, 5000);
    // };

    const handleBlur = () => {
      if (userInfo?.token && isInPage.current) {
        isMounted.current = false;
        dispatch(stopCronJobAction());
        dispatch({ type: "AUTO_TIME_READ_RESET" });
      }
    };

    // window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Clean up
    return () => {
      // window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [userInfo, manganame, chapname, chapid, dispatch]);

  return (
    <Layout>
      <div className="row">
        <div
          id="ctl00_divCenter"
          className={`${isLoading && "min-h-screen"} full-width col-sm-12`}
        >
          <div className="reading">
            <ChapterControl
              manga={manga || oldManga}
              prevChapter={prevChapter}
              nextChapter={nextChapter}
            />
            <ChapterPages images={chapter?.image} />
          </div>
          {manga && Object.keys(manga).length > 0 && (
            <CommentList
              manganame={manga?.nameOnUrl || oldManga?.nameOnUrl}
              chapter={chapter}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ReadPage;
