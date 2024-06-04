import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChapterList from "../Components/Home/ChapterList";
import CommentList from "../Components/SingleManga/CommentList";
import TopTitles from "../Components/Home/TopTitles";
import Rating from "../Components/SingleManga/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  // getCommentsMangaAction,
  getMangaByNameAction,
  getRatingMangaAction,
} from "../Redux/Actions/MangasActions";
import { convertToSlug, formatDate } from "../unit/formatDate";
import {
  FollowManga,
  IfMangaFollowed,
  deleteFollowManga,
} from "../Context/Functionalities";
import { getDataReadAction } from "../Redux/Actions/userActions";

const getStatus = (status) => {
  switch (status) {
    case 1:
      return "Đang tiến hành";
    case 2:
      return "Đã hoàn thành";
    default:
      return "Bị đình trệ";
  }
};

const coverUrl = (genreName) => {
  const normalizedString = genreName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const nameOnUrl = normalizedString
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return nameOnUrl;
};

const getOtherName = (jn = "", en = "") => {
  if (jn === "" && en === "") {
    return "Đang cập nhật ....";
  } else {
    return jn === "" ? en : en === "" ? jn : jn + ", " + en;
  }
};

const getStar = (rate) => {
  return rate?.reduce((a, b) => a + b.rating, 0) / rate?.length;
};

function SingleManga() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { manganame } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  // const [mangaName, setManganame] = useState();
  const [isShow, setIsShow] = useState(false);
  const toggleeShow = () => {
    setIsShow(!isShow);
  };
  const { isLoading, isError, manga, firstChapter, lastChapter } = useSelector(
    (state) => state.getMangaByName
  );
  const { rate } = useSelector((state) => state.getMangaRatingManga);
  // const { mangaComments, totalComments } = useSelector(
  //   (state) => state.getMangaComments
  // );
  const {
    isLoading: dataReadLoading,
    dataRead,
    chapName,
  } = useSelector((state) => state.userGetDataRead);
  // console.log(dataRead);
  // console.log(chapName);
  const followedMangas = useSelector(
    (state) => state.userGetAllFollowMangas.allFollowMangas
  );
  const oldMangaRef = useRef();
  const oldRateRef = useRef();
  useEffect(() => {
    if (manga && Object.keys(manga).length > 0) {
      oldMangaRef.current = manga;
    }
    if (rate && Object.keys(rate).length > 0) {
      oldRateRef.current = rate;
    }
  }, [manga, rate]);

  const oldManga = oldMangaRef.current;
  const oldRate = oldRateRef.current;
  // const [numFollow, setNumFollow] = useState(manga?.numberOfFollows);
  // if liked function
  const isFollowed = (manga) => IfMangaFollowed(manga, followedMangas);
  useEffect(() => {
    // const name = manganame.substring(0, manganame.lastIndexOf("-"));
    dispatch(getMangaByNameAction(manganame, true));
    dispatch(getRatingMangaAction(manganame));
    if (userInfo?.token) {
      dispatch(getDataReadAction(manganame));
    }
    if (isError) {
      // toast.error(isError);
      navigate("/notpound");
    }
  }, [dispatch, manganame, isError, navigate, userInfo]);
  // useEffect(() => {
  //   dispatch(getCommentsMangaAction(manganame));
  //   // setManganame(name);
  // }, [dispatch, manganame]);
  // useEffect(() => {
  //   dispatch(getRatingMangaAction(manganame));
  // }, [dispatch, manganame]);
  // const manga = MangaData.find((item) => item.nameOnUrl === mangaName);
  // if (!manga) return <Layout>Loading...</Layout>;
  return (
    <Layout>
      <div className="row">
        <div
          id="ctl00_divCenter"
          className={`${isLoading ? "min-h-screen" : ""} center-side col-md-8`}
        >
          <ul
            className="breadcrumb"
            itemType="http://schema.org/BreadcrumbList"
          >
            <li
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
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
            <li
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <Link
                to="/the-loai"
                className="itemcrumb"
                itemProp="item"
                itemType="http://schema.org/Thing"
              >
                <span itemProp="name">Thể loại</span>
              </Link>
              <meta itemProp="position" content={"2"} />
            </li>
            {isLoading ? (
              <></>
            ) : (
              <li
                itemProp="itemListElement"
                itemType="http://schema.org/ListItem"
              >
                <Link
                  to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                  className="itemcrumb active"
                  itemProp="item"
                  itemType="http://schema.org/Thing"
                >
                  <span itemProp="name">{manga?.name || oldManga?.name}</span>
                </Link>
                <meta itemProp="position" content={"3"} />
              </li>
            )}
          </ul>
          {isLoading ? (
            <></>
          ) : (
            <article id="item-detail">
              <h1 className="title-detail">{manga?.name || oldManga?.name}</h1>
              <time className="small">
                [Cập nhật lúc:{" "}
                {formatDate(manga?.updatedAt || oldManga?.updatedAt)} trước]
              </time>
              <div className="detail-info">
                <div className="row">
                  <div className="col-xs-4 col-image">
                    <img
                      src={manga?.image || oldManga?.image}
                      alt={manga?.name}
                    />
                  </div>
                  <div className="col-xs-8 col-info">
                    <ul className="list-info">
                      <li className="author row">
                        <p className="name col-xs-4">
                          <i className="fa fa-plus"></i> Tên khác
                        </p>
                        <p className="col-xs-8">
                          {getOtherName(
                            manga?.janpanName || oldManga?.janpanName,
                            manga?.engName || oldManga?.engName
                          )}
                        </p>
                      </li>
                      <li className="author row">
                        <p className="name col-xs-4">
                          <i className="fa fa-user"></i> Tác giả
                        </p>
                        <p className="col-xs-8">
                          {manga?.author || oldManga?.author
                            ? manga?.author || oldManga?.author
                            : "Đang cập nhật"}
                        </p>
                      </li>
                      <li className="status row">
                        <p className="name col-xs-4">
                          <i className="fa fa-rss"></i> Tình trạng
                        </p>
                        <p className="col-xs-8">
                          {getStatus(manga?.status || oldManga?.status)}
                        </p>
                      </li>
                      <li className="kind row">
                        <p className="name col-xs-4">
                          <i className="fa fa-tags"></i> Thể loại
                        </p>
                        <p className="col-xs-8">
                          {(manga?.genre || oldManga?.genre)?.map(
                            (genre, idx) => (
                              <span key={idx}>
                                <Link to={`/the-loai/${coverUrl(genre)}`}>
                                  {genre}
                                </Link>
                                {idx !== manga?.genre?.length - 1 && " - "}
                              </span>
                            )
                          )}
                        </p>
                      </li>
                      <li className="row">
                        <p className="name col-xs-4">
                          <i className="fa fa-eye"></i> Lượt xem
                        </p>
                        <p className="col-xs-8">
                          {manga?.numberOfViews || oldManga?.numberOfViews}
                        </p>
                      </li>
                    </ul>
                    <div
                      className="mrt5 mrb10"
                      itemType="http://schema.org/Book"
                    >
                      <Link
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                      >
                        <span itemProp="name">
                          {manga?.name || oldManga?.name}
                        </span>
                      </Link>
                      <span
                        itemProp="aggregateRating"
                        itemType="https://schema.org/AggregateRating"
                      >
                        {" "}
                        Xếp hạng:{" "}
                        <span itemProp="ratingValue">
                          {rate?.length > 0 || oldRate?.length > 0
                            ? getStar(rate ? rate : oldRate).toFixed(1)
                            : 0}
                        </span>
                        /<span itemProp="bestRating">5</span> -{" "}
                        <span itemProp="ratingCount">
                          {rate?.length ? rate?.length : oldRate?.length}
                        </span>{" "}
                        Lượt đánh giá.
                      </span>
                    </div>
                    <Rating
                      manganame={manganame}
                      rate={getStar(rate).toFixed(1)}
                    />
                    <div className="follow">
                      {isFollowed(manga?._id) ? (
                        <Link
                          className="follow-link btn btn-danger"
                          onClick={() =>
                            deleteFollowManga(manga?._id, dispatch, manganame)
                          }
                        >
                          <i className="fa fa-times"></i> Bỏ theo dõi
                        </Link>
                      ) : (
                        <Link
                          className="follow-link btn btn-success"
                          to={userInfo?.token === undefined ? "/Login" : "#"}
                          onClick={() =>
                            FollowManga(
                              manga?._id,
                              dispatch,
                              userInfo,
                              manganame
                            )
                          }
                        >
                          <i className="fa fa-heart"></i> Theo dõi
                        </Link>
                      )}
                      <span>
                        <b>
                          {manga?.numberOfFollows !== undefined
                            ? manga?.numberOfFollows
                            : oldManga?.numberOfFollows}
                        </b>
                      </span>{" "}
                      Lượt theo dõi
                    </div>
                    <div className="read-action mrt10">
                      {firstChapter?._id === null ? (
                        <>
                          <Link
                            className="btn btn-warning mrb5 mr-2 px-3"
                            to="#"
                          >
                            {" "}
                            Đọc từ đầu
                          </Link>
                          <Link
                            className="btn btn-warning mrb5 mr-2 px-3"
                            to="#"
                          >
                            {" "}
                            Đọc mới nhất
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            className="btn btn-warning mrb5 mr-2 px-3"
                            to={`/truyen-tranh/${
                              manga?.nameOnUrl
                            }/${convertToSlug(firstChapter?.chapName)}/${
                              firstChapter?._id
                            }`}
                            // target="_blank"
                            title={firstChapter?.chapName}
                          >
                            {" "}
                            Đọc từ đầu
                          </Link>
                          <Link
                            className="btn btn-warning mrb5 mr-2 px-3"
                            to={`/truyen-tranh/${
                              manga?.nameOnUrl
                            }/${convertToSlug(lastChapter?.chapName)}/${
                              lastChapter?._id
                            }`}
                            // target="_blank"
                            title={lastChapter?.chapName}
                          >
                            {" "}
                            Đọc mới nhất
                          </Link>
                        </>
                      )}
                      {dataReadLoading ? (
                        <></>
                      ) : userInfo?.token &&
                        dataRead !== undefined &&
                        dataRead?.readChapter !== null ? (
                        <Link
                          className="btn btn-danger mrb5 mr-2 px-3"
                          to={`/truyen-tranh/${
                            manga?.nameOnUrl
                          }/${convertToSlug(chapName)}/${
                            dataRead?.readChapter
                          }`}
                        >
                          {" "}
                          Đọc tiếp
                        </Link>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-content">
                <h3 className="list-title">
                  <i className="fa fa-file-text-o"></i> Nội dung
                </h3>
                <p className={`${isShow ? "" : "shortened"}`}>
                  {/* <ReactMarkdown></ReactMarkdown> */}
                  {manga?.desc || oldManga?.desc || ""}
                </p>
                <Link
                  onClick={toggleeShow}
                  className={`morelink ${isShow ? "hidden" : ""}`}
                >
                  Xem thêm
                  <i className="fa fa-angle-right ml-2" />
                </Link>
                <Link
                  onClick={toggleeShow}
                  className={`morelink less ${isShow ? "" : "hidden"}`}
                >
                  <i className="fa fa-angle-left" /> Thu gọn
                </Link>
              </div>
              <ChapterList
                chapterList={manga?.chapter || oldManga?.chapter}
                nameOnUrl={manga?.nameOnUrl || oldManga?.nameOnUrl}
                dataRead={dataRead}
                chapName={chapName}
              />
            </article>
          )}

          <CommentList manganame={manganame} />
        </div>
        <div className="right-side col-md-4 cmszone" id="ctl00_divRight">
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default SingleManga;
