import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction } from "../Redux/Actions/userActions";
import { formatDate } from "../unit/formatDate";

function PublicInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userid } = useParams();
  const [isDefault, setIsDefault] = useState(true);
  const handleChange = () => {
    setIsDefault(!isDefault);
  };
  const { isLoading, userInfo, comments, isError } = useSelector(
    (state) => state.getUserInfo
  );
  useEffect(() => {
    dispatch(getUserInfoAction(userid));
    if (isError) {
      // toast.error(isError);
      navigate("/notpound");
    }
  }, [dispatch, userid, isError, navigate]);
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
              to="/user/123"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Thông tin thành viên</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="full-width col-sm-12">
          <div className="user-page clearfix">
            {isLoading ? (
              <></>
            ) : (
              <>
                <div className="user-detail clearfix">
                  <div className="avatar avatar-wrap">
                    <img
                      alt="avatar"
                      src={
                        userInfo?.image ? userInfo?.image : "/images/user.png"
                      }
                      className="user-img"
                    />
                  </div>
                  <div className="info">
                    <span className="authorname name-5">
                      {userInfo?.fullName}
                    </span>
                    <div className="mrt10">
                      Ngày đăng ký: {formatDate(userInfo?.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="nav nav-tabs main-tab mrt20 mrb20">
                  <li className={`${isDefault ? "active" : ""}`}>
                    <Link data-toggle="tab" href="#" onClick={handleChange}>
                      Bình luận
                    </Link>
                  </li>
                  <li className={`${isDefault ? "" : "active"}`}>
                    <Link data-toggle="tab" href="#" onClick={handleChange}>
                      Truyện theo dõi
                    </Link>
                  </li>
                </div>
                <div className="tab-content">
                  <div
                    id="nt_comments"
                    className={`tab-pane fade ${isDefault ? "active in" : ""}`}
                  >
                    <h2 className="posttitle">Bình luận mới nhất</h2>
                    <section className="user-table clearfix">
                      <div
                        id="ctl00_mainContent_divComments"
                        className="table-responsive"
                      >
                        {comments?.length > 0 ? (
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
                              {comments?.map((comment) => (
                                <tr key={comment?._id}>
                                  <td>
                                    <Link
                                      to={`/truyen-tranh/${comment?.mangaNameOnUrl}-${comment?.mangaId}`}
                                      rel="nofollow"
                                      className="image"
                                    >
                                      <img
                                        alt="test"
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
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <></>
                        )}
                      </div>
                    </section>
                  </div>
                  <div
                    id="nt_followed"
                    className={`tab-pane fade ${isDefault ? "" : "active in"}`}
                  >
                    <h2 className="posttitle">Truyện theo dõi</h2>
                    <section className="user-table clearfix">
                      Tài khoản này không công khai Truyện theo dõi
                    </section>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PublicInfo;
