import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DropDown from "./DropDown.js";

function MainNav() {
  // const pathName = window.location.pathname; // Lấy pathName của URL

  // const lastSegment = pathName.substring(pathName.lastIndexOf("/") + 1);
  const location = useLocation();
  const [lastSegment, setLastSegment] = useState("");

  useEffect(() => {
    const pathName = location.pathname;
    const segment = pathName.substring(pathName.lastIndexOf("/") + 1);
    setLastSegment(segment);
  }, [location]);
  return (
    <div className="Module Module-144">
      <div className="ModuleContent">
        <ul className="nav navbar-nav main-menu">
          <li className={lastSegment === "" ? "active" : ""}>
            <NavLink target="_self" to="/">
              <i className="fa fa-home hidden-xs"></i>
              <span className="visible-xs">Trang chủ</span>
            </NavLink>
          </li>
          <li className={lastSegment === "hot" ? "active" : ""}>
            <NavLink target="_self" to="/hot">
              Hot
            </NavLink>
          </li>
          <li className={lastSegment === "theo-doi" ? "active" : ""}>
            <NavLink target="_self" to="/theo-doi">
              Theo dõi
            </NavLink>
          </li>
          <li className={lastSegment === "newupdate" ? "active" : ""}>
            <Link target="_self" to="/newupdate">
              Mới cập nhật
            </Link>
          </li>
          <li className={lastSegment === "lich-su" ? "active" : ""}>
            <NavLink target="_self" to="/lich-su">
              Lịch sử
            </NavLink>
          </li>
          <li
            className={`dropdown ${lastSegment === "the-loai" ? "active" : ""}`}
          >
            <NavLink
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false"
              target="_self"
              to="/the-loai"
            >
              Thể loại <i className="fa fa-caret-down"></i>
            </NavLink>
            <ul className="dropdown-menu megamenu">
              <li>
                <div className="clearfix">
                  <DropDown />
                  <div className="col-sm-12 hidden-xs">
                    <p className="tip"></p>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li className={lastSegment === "tim-truyen-nang-cao" ? "active" : ""}>
            <Link target="_self" to="/tim-truyen-nang-cao">
              Tìm truyện
            </Link>
          </li>
          <li className={lastSegment === "truyen-con-gai" ? "active" : ""}>
            <Link target="_self" to="/truyen-con-gai">
              Con gái
            </Link>
          </li>
          <li className={lastSegment === "truyen-con-trai" ? "active" : ""}>
            <Link target="_self" to="/truyen-con-trai">
              Con trai
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainNav;
