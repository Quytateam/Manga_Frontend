import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useOffSetTop from "../../hooks/useOffSetTop";
import { convertToSlug, formatDateFull } from "../../unit/formatDate";
import { useDispatch, useSelector } from "react-redux";
import {
  FollowManga,
  IfMangaFollowed,
  deleteFollowManga,
} from "../../Context/Functionalities";

function ChapterControl({ manga, prevChapter, nextChapter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapid } = useParams();
  const offsetTop = useOffSetTop(342);
  const chapter = manga?.chapter?.find((item) => item?._id === chapid);
  const { userInfo } = useSelector((state) => state.userLogin);
  const followedMangas = useSelector(
    (state) => state.userGetAllFollowMangas.allFollowMangas
  );
  const manganame = manga?.nameOnUrl + "=" + manga?._id;
  // const [currentIndex, setCurrentIndex] = useState(
  //   manga?.chapter?.findIndex((i) => i._id === chapid)
  // );
  // const [canPrev, setCanPrev] = useState(manga?.chapter[0]._id === chapid);
  // const [canNext, setCanNext] = useState(
  //   manga?.chapter[manga?.chapter?.length - 1]._id === chapid
  // );
  const [canPrev, setCanPrev] = useState(prevChapter !== null);
  const [canNext, setCanNext] = useState(nextChapter !== null);
  const goToChapter = (v) => {
    const chapNameSelect = manga?.chapter?.find((item) => item?._id === v);
    navigate(
      `/truyen-tranh/${manga?.nameOnUrl}/${chapNameSelect.chapName}/${v}`
    );
  };
  const isFollowed = (manga) => IfMangaFollowed(manga, followedMangas);
  useEffect(() => {
    // setCurrentIndex(manga?.chapter?.findIndex((i) => i._id === chapid));
    // setCanPrev(manga?.chapter[0]._id === chapid);
    // setCanNext(manga?.chapter[manga?.chapter?.length - 1]._id === chapid);
    setCanPrev(prevChapter !== null);
    setCanNext(nextChapter !== null);
  }, [manga, chapid, prevChapter, nextChapter, userInfo, dispatch, manganame]);
  return (
    // <div className="container">
    <>
      <div className="top">
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
              to="/the-loai"
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Thể loại</span>
            </Link>
            <meta itemProp="position" content={"2"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              {manga?.name}
            </Link>
            <meta itemProp="position" content={"3"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <Link
              to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
                chapter?.chapName
              )}/${chapid}`}
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">{chapter?.chapName}</span>
            </Link>
            <meta itemProp="position" content={"4"} />
          </li>
        </ul>
        <h1 className="txt-primary">
          <Link to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}>
            {manga?.name}
          </Link>{" "}
          <span>- {chapter?.chapName}</span>
        </h1>
        <i>[Cập nhật lúc: {formatDateFull(chapter?.updatedAt)}]</i>
      </div>
      <div className="reading-control">
        <div className="mrb10">
          <Link
            rel="nofollow"
            href="https://www.facebook.com/Zennomi"
            target="_blank"
            className="alertError btn btn-warning"
          >
            <i className="fa fa-exclamation-triangle" /> Báo lỗi
          </Link>
        </div>
        <div className="alert alert-info mrb10 hidden-xs hidden-sm">
          <i className="fa fa-info-circle" />{" "}
          <em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
        </div>
        <div
          className={`chapter-nav mx-auto flex justify-center items-center gap-x-1 ${
            offsetTop ? "fixed top-0 right-0 w-full bg-black" : ""
          }`}
          style={{ zIndex: offsetTop && 1000 }}
          id="chapterNav"
        >
          <div className="flex items-center justify-center gap-x-1">
            <Link className="home" href="/" title="Trang chủ">
              <i className="fa fa-home" />
            </Link>
            <Link
              className="home backward"
              to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
              title={manga?.name}
            >
              <i className="fa fa-list" />
            </Link>
            <Link className="home changeserver" href="#" title="Đổi server">
              <i className="fa fa-undo error" />
              <span>1</span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-x-1">
            <Link
              className={`prev a_prev ${
                canPrev ? "" : "disabled pointer-events-none"
              }`}
              // to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
              //   manga?.chapter[currentIndex - 1]?.chapName
              // )}/${manga?.chapter[currentIndex - 1]?._id}`}
              to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
                prevChapter?.chapName
              )}/${prevChapter?._id}`}
            >
              <i className="fa fa-chevron-left" />
            </Link>
            <select
              name="ctl00$mainContent$ddlSelectChapter"
              id="ctl00_mainContent_ddlSelectChapter"
              className="select-chapter min-w-[100px] md:min-w-[200px]"
              value={chapid}
              onChange={(event) => {
                goToChapter(event.target.value);
              }}
            >
              {manga?.chapter?.map((item) => (
                <option value={item?._id} key={item?._id}>
                  {item?.chapName !== ""
                    ? item?.title !== ""
                      ? `${item?.chapName}: ${item?.title}`
                      : `${item?.chapName}`
                    : "Oneshot"}
                </option>
              ))}
            </select>
            <Link
              className={`next a_next ${
                canNext ? "" : "disabled pointer-events-none"
              }`}
              // to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
              //   manga?.chapter[currentIndex + 1]?.chapName
              // )}/${manga?.chapter[currentIndex + 1]?._id}`}
              to={`/truyen-tranh/${manga?.nameOnUrl}/${convertToSlug(
                nextChapter?.chapName
              )}/${nextChapter?._id}`}
            >
              <i className="fa fa-chevron-right" />
            </Link>
          </div>
          {isFollowed(manga?._id) ? (
            <Link
              className="follow-link btn btn-danger"
              onClick={() =>
                deleteFollowManga(manga?._id, dispatch, manganame, chapid)
              }
            >
              <i className="fa fa-times"></i> Bỏ theo dõi
            </Link>
          ) : (
            <Link
              className="follow-link btn btn-success"
              to={userInfo?.token === undefined ? "/Login" : "#"}
              onClick={() =>
                FollowManga(manga?._id, dispatch, userInfo, manganame, chapid)
              }
            >
              <i className="fa fa-heart"></i> Theo dõi
            </Link>
          )}
        </div>
        <div
          style={{ display: "none", width: 920, height: 42, float: "none" }}
        />
      </div>
    </>
  );
}

export default ChapterControl;
