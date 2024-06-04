import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, NavLink, useParams } from "react-router-dom";
import { SideLinks } from "../../Data/SideLinks";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function SecureInfo() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { sidelink } = useParams();
  const sidelinkSelect = SideLinks.find((s) => s.link === sidelink);
  const [showSide, setShowSide] = useState(true);
  const toggleShowSide = () => {
    setShowSide(!showSide);
  };
  const logoutHandle = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
  };
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
              to={`/secure/${sidelinkSelect.link}`}
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">{sidelinkSelect.name}</span>
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
                      alt=""
                      src={
                        userInfo?.image ? userInfo?.image : "/images/user.png"
                      }
                      className="avatar user-img"
                    />
                    <figcaption>
                      <div className="title">Tài khoản của</div>
                      <div className="user-name">{userInfo.fullName}</div>
                    </figcaption>
                  </figure>
                </div>
                <i
                  className={`${
                    showSide ? "fa active fa-angle-down" : "fa fa-bars"
                  }`}
                  onClick={toggleShowSide}
                ></i>
                {/* <i className="fa fa-bars"></i> */}
              </section>
              {showSide && (
                <nav className="user-sidelink clearfix">
                  <ul>
                    {SideLinks.map((link, idx) => (
                      <li
                        key={idx}
                        className={`hvr-sweep-to-right ${
                          link.link === sidelink ? "active" : ""
                        }`}
                      >
                        <Link to={`/secure/${link.link}`}>
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
                <h1 className="postname text-start">{sidelinkSelect.name}</h1>
                {sidelinkSelect.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SecureInfo;
