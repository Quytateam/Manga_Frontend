import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
function AdminLayout({ children }) {
  const parts = window.location.pathname.split("/");
  const adminside = parts[2];
  const func = parts[3];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // logout function
  const logoutHandle = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
  };
  const { userInfo } = useSelector((state) => state.userLogin);
  const AdminSide = userInfo?.isAdmin
    ? [
        {
          name: "Quản lý truyện",
          link: "ManageAllManga",
          icon: "fa fa-book",
          func: [
            {
              name: "Cập nhật truyện",
              link: "Update",
            },
            {
              name: "Quản lý chương",
              link: "ManageChapter",
            },
            {
              name: "Thêm chương mới",
              link: "CreateChapter",
            },
            {
              name: "Cập nhật chương",
              link: "UpdateChapter",
            },
          ],
        },
        {
          name: "Quản lý người dùng",
          link: "ManageUser",
          icon: "fa fa-user",
        },
        {
          name: "Quản lý thể loại",
          link: "ManageGenre",
          icon: "fa fa-list-alt",
        },
        {
          name: "Truyện đã đăng",
          link: "ManageManga",
          icon: "fa fa-book",
          func: [
            {
              name: "Cập nhật truyện",
              link: "Update",
            },
            {
              name: "Quản lý chương",
              link: "ManageChapter",
            },
            {
              name: "Thêm chương mới",
              link: "CreateChapter",
            },
            {
              name: "Cập nhật chương",
              link: "UpdateChapter",
            },
          ],
        },
        {
          name: "Truyện tham gia gia update",
          link: "JoinUpMangas",
          icon: "fa fa-book",
          func: [
            {
              name: "Quản lý chương",
              link: "ManageChapter",
            },
            {
              name: "Thêm chương mới",
              link: "CreateChapter",
            },
            {
              name: "Cập nhật chương",
              link: "UpdateChapter",
            },
          ],
        },
        {
          name: "Thêm truyên mới",
          link: "Create",
          icon: "fa fa-pencil-square-o",
        },
      ]
    : [
        {
          name: "Truyện đã đăng",
          link: "ManageManga",
          icon: "fa fa-book",
          func: [
            {
              name: "Cập nhật truyện",
              link: "Update",
            },
            {
              name: "Quản lý chương",
              link: "ManageChapter",
            },
            {
              name: "Thêm chương mới",
              link: "CreateChapter",
            },
            {
              name: "Cập nhật chương",
              link: "UpdateChapter",
            },
          ],
        },
        {
          name: "Truyện tham gia gia update",
          link: "JoinUpMangas",
          icon: "fa fa-book",
          func: [
            {
              name: "Quản lý chương",
              link: "ManageChapter",
            },
            {
              name: "Thêm chương mới",
              link: "CreateChapter",
            },
            {
              name: "Cập nhật chương",
              link: "UpdateChapter",
            },
          ],
        },
        {
          name: "Thêm truyên mới",
          link: "Create",
          icon: "fa fa-pencil-square-o",
        },
      ];

  // const link = func ? adminside + "/" + func : adminside;
  let sidelinkSelect = null;
  if (func) {
    const side = AdminSide.find((s) => s.link === adminside);
    sidelinkSelect = side.func.find((s) => s.link === func);
  } else {
    sidelinkSelect = AdminSide.find((s) => s.link === adminside);
  }
  const [showSide, setShowSide] = useState(true);
  const toggleShowSide = () => {
    setShowSide(!showSide);
  };
  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <>
      <Layout>
        <div id="ctl00_Breadcrumbs_pnlWrapper">
          <ul
            className="breadcrumb"
            itemType="http://schema.org/BreadcrumbList"
          >
            <li
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
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
            <li
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <NavLink
                to={`/admin/${sidelinkSelect?.link}`}
                className="itemcrumb active"
                itemProp="item"
                itemType="http://schema.org/Thing"
              >
                <span itemProp="name">{sidelinkSelect?.name}</span>
              </NavLink>
              <meta itemProp="position" content={"2"} />
            </li>
          </ul>
        </div>
        <div className="row">
          <div id="ctl00_divCenter" className="full-width col-sm-12">
            <div className="row">
              <div className="col-md-3 col-sm-4">
                <section className="user-sidebar clearfix">
                  <div className="userinfo clearfix">
                    <figure>
                      <img
                        alt={userInfo?.fullName}
                        src={
                          userInfo?.image ? userInfo?.image : "/images/user.png"
                        }
                        className="avatar user-img"
                      />
                      <figcaption>
                        <div className="title">Tài khoản của</div>
                        <div className="user-name">{userInfo?.fullName}</div>
                      </figcaption>
                    </figure>
                  </div>
                  <i
                    className={`${
                      showSide ? "fa active fa-angle-down" : "fa fa-bars"
                    }`}
                    onClick={toggleShowSide}
                  ></i>
                </section>
                {showSide && (
                  <nav className="user-sidelink clearfix">
                    <ul>
                      {AdminSide.map((link, idx) => (
                        <li
                          key={idx}
                          className={`hvr-sweep-to-right ${
                            link.link === adminside ? "active" : ""
                          }`}
                        >
                          <Link to={`/admin/${link.link}`}>
                            <i className={`${link.icon} pr-2`}></i>
                            {link.name}
                          </Link>
                        </li>
                      ))}
                      <li className="hvr-sweep-to-righ">
                        <Link to={`/`} onClick={logoutHandle}>
                          <i className="fa fa-sign-out pr-2"></i>
                          Thoát
                        </Link>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
              <div className="col-md-9 col-sm-8">
                <div className="user-page clearfix">
                  <h1 className="postname text-start">
                    {func && (
                      <Link
                        className="fa-angle-left mr-2"
                        onClick={handleReturn}
                      />
                    )}
                    {sidelinkSelect.name}
                  </h1>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AdminLayout;
