import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentMangasAction,
  getFollowMangasAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { convertToSlug, formatDate } from "../../unit/formatDate";

function Dashboard() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isLoading, isError, followMangas } = useSelector(
    (state) => state.userGetFollowMangas
  );
  const {
    isLoading: commentLoading,
    isError: commentError,
    commentMangas,
  } = useSelector((state) => state.userGetCommentMangas);
  // useEffect
  useEffect(() => {
    dispatch(getFollowMangasAction());
    dispatch(getCommentMangasAction());
    if (isError || commentError) {
      toast.error(isError || commentError);
      dispatch({
        type: isError ? "GET_FOLLOW_MANGAS_RESET" : "GET_COMMENT_MANGAS_RESET",
      });
    }
  }, [dispatch, isError, commentError]);
  return (
    <div className="row">
      <div className="col-xs-12 col-md-6">
        <div className="account-info clearfix">
          <h2 className="posttitle">Thông tin tài khoản</h2>
          <Link className="link" to="/secure/UserProfile">
            Chỉnh sửa
          </Link>
          <div className="info-detail">
            <div className="group">
              <div className="label">Họ và tên</div>
              <div className="detail">{userInfo.fullName}</div>
            </div>
            <div className="group">
              <div className="label"></div>
              <div className="detail">
                <Link
                  id="ctl00_mainContent_hplPublicProfile"
                  // to={`/user/${_id}`}
                  to={`/user/${userInfo._id}`}
                >
                  Thông tin công khai
                </Link>
              </div>
              <div className="group">
                <div className="label">Email</div>
                <div className="detail">{userInfo.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-xs-12 col-md-6">
        <div className="account-info clearfix">
          <h2 className="posttitle">Liên kết Tài khoản Google</h2>
          <div className="info-detail">
            <div className="group">
              <div className="label">Trạng thái</div>
              <div className="detail">Chưa liên kết</div>
            </div>
            <div className="group">
              <div className="label"></div>
              <div className="detail">
                <Link id="ctl00_mainContent_lkbLinkGoogle">Liên kết</Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="col-xs-12">
        <div className="relative">
          <h2 className="posttitle">Truyện theo dõi</h2>
          <Link className="link" to="/secure/ComicFollowed">
            Xem tất cả
          </Link>
        </div>
        <section className="comics-followed comics-followed-nopaging user-table clearfix">
          {/* <div className="alert alert-success">
            Truyện chưa đọc sẽ hiển thị ở đầu danh sách, nhấn vào "Đã đọc" nếu
            truyện đọc rồi.
          </div> */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th className="nowrap">Tên truyện</th>
                  <th className="nowrap">Xem gần nhất</th>
                  <th className="nowrap">Chap mới nhất</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <></>
                ) : followMangas?.length > 0 ? (
                  followMangas?.slice(0, 5).map((manga) => (
                    <tr key={manga?._id} className="unread">
                      <td>
                        <Link
                          className="image"
                          title={manga?.name}
                          to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                        >
                          <img
                            src={manga?.image}
                            className="lazy"
                            data-original={manga?.image}
                            alt={manga?.name}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="comic-name"
                          title={manga?.name}
                          to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}`}
                        >
                          {manga?.name}
                        </Link>
                        <div className="follow-action">
                          {/* <Link className="mark-as-read" data-id="20857">
                          <i className="fa fa-check"></i> Đã đọc
                        </Link> */}
                          <Link
                            className="follow-link"
                            data-id="20857"
                            data-key="a96f7c8f-f7dc-b375-bdef-ce7b9210e0a4"
                          >
                            <i className="fa fa-times"></i> Bỏ theo dõi
                          </Link>
                        </div>
                      </td>
                      <td className="nowrap chapter">
                        <Link
                          className="visited"
                          to={`/truyen-tranh/${
                            manga?.nameOnUrl
                          }/${convertToSlug(manga?.chapterNameReading)}/${
                            manga?.readChapter
                          }`}
                          title={manga?.chapterNameReading}
                        >
                          {manga?.chapterNameReading}
                        </Link>
                        <br />
                        <time className="time">
                          {manga?.chapterNameReading
                            ? formatDate(manga?.lastRead)
                            : ""}
                        </time>{" "}
                      </td>
                      <td className="nowrap chapter">
                        {manga?.chapter?.length > 0 && (
                          <>
                            <Link
                              to={`/truyen-tranh/${
                                manga?.nameOnUrl
                              }/${convertToSlug(manga?.chapter[0].chapName)}/${
                                manga?.chapter[0]._id
                              }`}
                              title={manga?.chapter[0]?.chapName}
                            >
                              {manga?.chapter[0].chapName}
                            </Link>
                            <br />
                            <time className="time">
                              {formatDate(manga?.chapter[0].updatedAt)}
                            </time>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div className="col-xs-12">
        <div className="relative">
          <h2 className="posttitle">Bình luận</h2>
          <Link to="/secure/Comments" className="link">
            Xem tất cả
          </Link>
        </div>
        <section className="user-table clearfix">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th className="nowrap">Tên truyện</th>
                  <th className="nowrap">Thời gian</th>
                  <th className="nowrap">Nội dung</th>
                </tr>
              </thead>
              <tbody>
                {commentLoading ? (
                  <></>
                ) : commentMangas?.length > 0 ? (
                  commentMangas?.slice(0, 5).map((comment) => (
                    <tr key={comment?._id}>
                      <td>
                        <Link
                          to={`/truyen-tranh/${comment?.mangaNameOnUrl}-${comment?.mangaId}`}
                          rel="nofollow"
                          className="image"
                        >
                          <img
                            alt={comment?.mangaName}
                            className="lazy"
                            data-original={comment?.mangaImage}
                            src={comment?.mangaImage}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          rel="nofollow"
                          to={`/truyen-tranh/${comment?.mangaNameOnUrl}-${comment?.mangaId}`}
                        >
                          {comment?.mangaName}
                        </Link>
                      </td>
                      <td className="nowrap">
                        <time className="time">
                          {formatDate(comment?.createdAt)}
                        </time>
                      </td>
                      <td>
                        <div className="word-wrap">
                          {comment?.commentContent}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
