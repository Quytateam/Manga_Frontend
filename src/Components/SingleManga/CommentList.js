import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsChapterAction,
  getCommentsMangaAction,
  emoCommentAction,
  emoFeedBackAction,
} from "../../Redux/Actions/MangasActions";
import FeedBackForm from "./FeedBackForm";
import { SendRequest } from "../../Context/Functionalities";
import { convertToSlug } from "../../unit/formatDate";

const getLike = (emo) => {
  return emo?.reduce((a, b) => {
    if (b.emo === "LIKE") {
      return a + 1;
    }
    return a;
  }, 0);
};

const getDisLike = (emo) => {
  return emo?.reduce((a, b) => {
    if (b.emo === "DISLIKE") {
      return a + 1;
    }
    return a;
  }, 0);
};

function CommentList({ manganame, chapter }) {
  // const manganame = manga !== undefined ? manga?.nameOnUrl : mangaName;
  // console.log(manga);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [isShow, setIsShow] = useState(false);
  // const [isNew, setIsNew] = useState(false);
  const [isShowFB, setIsShowFB] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [isChoose, setIsChoose] = useState(false);
  const commentMoreRef = useRef(null);
  const [page, setPage] = useState(0);
  const { userInfo } = useSelector((state) => state.userLogin);

  const openComment = () => {
    if (userInfo?.token) setIsShow(!isShow);
    else naviagte("/Login");
  };
  const handleEmoComment = (id, emo, manganame, chapname, chapid) => {
    if (userInfo?.token)
      dispatch(emoCommentAction({ id, emo, manganame, chapname, chapid }));
  };
  const handleEmoFeedBack = (
    commentid,
    feedbackid,
    emo,
    manganame,
    chapname,
    chapid
  ) => {
    if (userInfo?.token)
      dispatch(
        emoFeedBackAction({
          commentid,
          feedbackid,
          emo,
          manganame,
          chapname,
          chapid,
        })
      );
  };
  const openFeedBack = (commentId) => {
    if (userInfo?.token) {
      setIdSelect(commentId);
      setIsShowFB(!isShowFB);
    } else naviagte("/Login");
  };
  const toggleReport = (commentId) => {
    if (userInfo?.token) {
      setIdSelect(commentId);
      setIsReport(!isReport);
    } else naviagte("/Login");
  };
  const { mangaComments, totalComments } = useSelector(
    (state) => state.getMangaComments
  );
  const { chapterComments, totalComments: totalCommentsChap } = useSelector(
    (state) => state.getChapterComments
  );
  const comments = chapter === undefined ? mangaComments : chapterComments;
  const total = chapter === undefined ? totalComments : totalCommentsChap;
  const oldCommentsRef = useRef();
  const oldTotalRef = useRef();
  useEffect(() => {
    if (comments && comments.length > 0) {
      oldCommentsRef.current = comments;
    }
    if (total) {
      oldTotalRef.current = total;
    }
  }, [comments, total]);

  const oldComment = oldCommentsRef.current;
  const oldTotal = oldTotalRef.current;
  const handlePageChange = (e) => {
    setPage(e.selected);
    // dispatch(getCommentsMangaAction(manganame, e.selected + 1));
  };
  const handleSortComment = () => {
    const newlist = isChoose ? "" : true;
    if (chapter === undefined)
      dispatch(getCommentsMangaAction(manganame, page + 1, newlist));
    else
      dispatch(
        getCommentsChapterAction(
          manganame,
          convertToSlug(chapter?.chapName),
          chapter?._id,
          page + 1,
          newlist
        )
      );
    setIsChoose(!isChoose);
  };
  useEffect(() => {
    var newlist = isChoose ? true : "";
    if (chapter === undefined)
      dispatch(getCommentsMangaAction(manganame, page + 1, newlist));
    else
      dispatch(
        getCommentsChapterAction(
          manganame,
          convertToSlug(chapter?.chapName),
          chapter?._id,
          page + 1,
          newlist
        )
      );
  }, [dispatch, manganame, page, chapter, isChoose]);
  return (
    <>
      <br></br>
      <ul className="nav nav-tabs main-tab lazy-module" datatype="facebook">
        <li className="active">
          <Link>
            <i className="fa fa-comments"></i> Bình luận (
            <span className="comment-count">{total || oldTotal || 0}</span>)
          </Link>
        </li>
      </ul>
      <div className="tab-content">
        <div className="nt_comments">
          <div className="comment-wrapper">
            <div
              className={`${isShow ? "hidden" : ""} placeholder`}
              onClick={openComment}
            >
              Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền,
              thiếu lành mạnh,... để tránh bị khóa tài khoản
            </div>
            {isShow && (
              <CommentForm
                manganame={manganame}
                chapname={convertToSlug(chapter?.chapName)}
                chapid={chapter?._id}
                setIsShow={setIsShow}
              />
            )}
            <div className="mrt10 mrb5">
              <span className="sort-comments comment-action">
                {/* <i className="icons"></i>Mới nhất */}
                <span
                  className={`${isChoose ? "icon-tick" : "icon-checkbox"} mt-2`}
                  onClick={() => handleSortComment()}
                ></span>
                Mới nhất
              </span>
            </div>
            {(comments || oldComment)?.length > 0 ? (
              <>
                <div className="comment-list">
                  {(comments || oldComment)?.map((comment) => (
                    <div key={comment?._id} className="item clearfix">
                      <figure className="avatar avatar-wrap">
                        <Link rel="nofollow" to={`/user/${comment?.userId}`}>
                          <img
                            src={
                              comment?.userImage
                                ? comment?.userImage
                                : "/images/user.png"
                            }
                            alt="111"
                            className="lazy"
                          />
                        </Link>
                      </figure>
                      <div className="summary">
                        <i className="fa fa-angle-left fa-arrow" />
                        <div className="info">
                          <div className="comment-header">
                            <Link
                              className={`authorname name-${comment?.userId}`}
                              to={`/user/${comment?.userId}`}
                            >
                              {comment?.userName}
                            </Link>
                            {comment?.chapId && (
                              <span className="cmchapter">
                                {comment?.chapName}
                              </span>
                            )}
                          </div>
                          <div className="comment-content">
                            {comment?.commentContent}
                          </div>
                        </div>
                        <ul className="comment-footer">
                          <li>
                            <span onClick={() => openFeedBack(comment?._id)}>
                              <i className="fa fa-comment"></i> Trả lời
                            </span>
                          </li>
                          <li>
                            <span
                              className="vote-up"
                              onClick={() =>
                                handleEmoComment(
                                  comment?._id,
                                  "LIKE",
                                  manganame,
                                  convertToSlug(chapter?.chapName),
                                  chapter?._id
                                )
                              }
                            >
                              <i className="fa fa-thumbs-up"></i>
                              <span className="vote-up-count ml-2">
                                {getLike(comment?.emo)}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span
                              className="vote-down"
                              onClick={() =>
                                handleEmoComment(
                                  comment?._id,
                                  "DISLIKE",
                                  manganame,
                                  convertToSlug(chapter?.chapName),
                                  chapter?._id
                                )
                              }
                            >
                              <i className="fa fa-thumbs-down"></i>
                              <span className="vote-down-count ml-2">
                                {getDisLike(comment?.emo)}
                              </span>
                            </span>
                          </li>
                          <li className="comment-more-wrap">
                            <span
                              className="more-action"
                              onClick={() => toggleReport(comment?._id)}
                            >
                              <i className="fa fa-ellipsis-h"></i>
                            </span>
                            <ul
                              ref={commentMoreRef}
                              className={`comment-more opened ${
                                isReport && idSelect === comment?._id
                                  ? ""
                                  : "hidden"
                              }`}
                              id={`comment_more_${comment?._id}`}
                            >
                              <li>
                                <span
                                  onClick={() =>
                                    SendRequest(
                                      setIsReport,
                                      dispatch,
                                      userInfo,
                                      "Report",
                                      comment?.commentContent,
                                      comment?._id
                                    )
                                  }
                                >
                                  Báo vi phạm
                                </span>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        {isShowFB && idSelect === comment?._id && (
                          <FeedBackForm
                            commentid={comment?._id}
                            manganame={manganame}
                            chapname={convertToSlug(chapter?.chapName)}
                            chapid={chapter?._id}
                            setIsShowFB={setIsShowFB}
                          />
                        )}
                        {comment?.feedBack?.map((feedBack) => (
                          <div
                            key={feedBack?._id}
                            className="item child"
                            id={`comment_${feedBack?._id}`}
                          >
                            <figure className="avatar avatar-wrap">
                              <Link
                                rel="nofollow"
                                to={`/user/${feedBack?.userId}`}
                              >
                                <img
                                  src={
                                    feedBack?.userImage
                                      ? feedBack?.userImage
                                      : "/images/user.png"
                                  }
                                  alt="111"
                                  className="lazy"
                                />
                              </Link>
                              <span className="point-total">6600</span>
                            </figure>
                            <div className="summary">
                              <i className="fa fa-angle-up fa-arrow"></i>{" "}
                              <div className="info">
                                <div className="comment-header">
                                  <Link
                                    className="authorname name-3"
                                    to={`/user/${feedBack?.userId}`}
                                  >
                                    {feedBack?.userName}
                                  </Link>
                                </div>
                                <div className="comment-content">
                                  <span className="mention-user">
                                    <i className="fa fa-mail-forward"></i>
                                    {feedBack?.feedBackToName}
                                  </span>
                                  {feedBack?.feedBackContent}
                                </div>
                              </div>
                              <ul className="comment-footer">
                                <li>
                                  <span
                                    onClick={() => openFeedBack(feedBack?._id)}
                                  >
                                    <i className="fa fa-comment"></i> Trả lời
                                  </span>
                                </li>
                                <li>
                                  <span
                                    className="vote-up"
                                    onClick={() =>
                                      handleEmoFeedBack(
                                        comment?._id,
                                        feedBack?._id,
                                        "LIKE",
                                        manganame,
                                        convertToSlug(chapter?.chapName),
                                        chapter?._id
                                      )
                                    }
                                  >
                                    <i className="fa fa-thumbs-up"></i>
                                    <span className="vote-up-count ml-2">
                                      {getLike(feedBack?.emo)}
                                    </span>
                                  </span>
                                </li>
                                <li>
                                  <span
                                    className="vote-down"
                                    onClick={() =>
                                      handleEmoFeedBack(
                                        comment?._id,
                                        feedBack?._id,
                                        "DISLIKE",
                                        manganame,
                                        convertToSlug(chapter?.chapName),
                                        chapter?._id
                                      )
                                    }
                                  >
                                    <i className="fa fa-thumbs-down"></i>
                                    <span className="vote-down-count ml-2">
                                      {getDisLike(feedBack?.emo)}
                                    </span>
                                  </span>
                                </li>
                                <li className="comment-more-wrap">
                                  <span
                                    className="more-action"
                                    onClick={() => toggleReport(feedBack?._id)}
                                  >
                                    <i className="fa fa-ellipsis-h"></i>
                                  </span>
                                  <ul
                                    ref={commentMoreRef}
                                    className={`comment-more opened ${
                                      isReport && idSelect === feedBack?._id
                                        ? ""
                                        : "hidden"
                                    }`}
                                    id={`comment_more_${feedBack?._id}`}
                                  >
                                    <li>
                                      <span
                                        onClick={() =>
                                          SendRequest(
                                            setIsReport,
                                            dispatch,
                                            userInfo,
                                            "Report",
                                            feedBack?.feedBackContent,
                                            comment?._id,
                                            feedBack?._id
                                          )
                                        }
                                      >
                                        Báo vi phạm
                                      </span>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                              {isShowFB && idSelect === feedBack?._id && (
                                <FeedBackForm
                                  commentid={comment?._id}
                                  feedbackid={feedBack?._id}
                                  manganame={manganame}
                                  chapname={convertToSlug(chapter?.chapName)}
                                  chapid={chapter?._id}
                                  setIsShowFB={setIsShowFB}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {(total || oldTotal) > 15 && (
                  <div
                    id="ctl00_mainContent_ctl00_divPager"
                    className="pagination-outter"
                  >
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      // onPageChange={(event) => {
                      //   setPage(event.selected);
                      // }}
                      onPageChange={handlePageChange}
                      pageRangeDisplayed={5}
                      pageCount={Math.ceil((total || oldTotal) / 15)}
                      // pageCount={Math.ceil(total / chaptersPerPage)}
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
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentList;
