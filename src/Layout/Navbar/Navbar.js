import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import NettromLogo from "../../assets/nettrom-logo.png";
import MangaLogo from "../../assets/mangadex-logo.svg";
import SearchInput from "./SearchInput";
// import routes from "../../routes.ts";
import MainNav from "./MainNav.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions.js";
import toast from "react-hot-toast";
// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:5000";
// var socket;

function Navbar({ toggleTheme }) {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [socketConnected, setSocketConnected] = useState(false);
  // const [isFalse, setIsFalse] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { isSuccess: verifyEmailSuccess } = useSelector(
    (state) => state.userVerifyEmail
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // logout function
  const logoutHandle = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
    navigate("/");
  };
  useEffect(() => {
    setOpenMenu(false);
  }, []);
  // }, [pathname, params])

  // useEffect(() => {
  //   if ((userInfo || user)?.token) {
  //     socket = io(ENDPOINT);
  //     socket.emit("setup", userInfo);
  //     socket.on("connected", () => setSocketConnected(true));
  //     return () => {
  //       socket.disconnect();
  //       setSocketConnected(false);
  //     };
  //   } else {
  //     // socket.off("disconnect", () => setSocketConnected(false));
  //   }
  // }, [userInfo]);
  return (
    <header
      className={`header ${
        openMenu ? "menu-open fixed top-0 right-0 z-999" : ""
      }`}
      id="header"
    >
      <div className="navbar">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              <NavLink
                to="/"
                className="logo !flex !items-center"
                title="Truyện tranh online"
              >
                <img
                  alt="Logo"
                  className="my-auto"
                  src={MangaLogo}
                  width="150"
                  style={{ aspectRatio: 5 }}
                />
              </NavLink>
            </div>
            <div className="navbar-form navbar-left hidden-xs search-box comicsearchbox">
              <SearchInput />
            </div>
            <i
              className="fa fa-lightbulb-o toggle-dark"
              onClick={toggleTheme}
            ></i>
            {(userInfo || user)?.token && (
              <div className="notifications">
                <Link
                  to="/secure/Notifications"
                  className="fa fa-comment"
                ></Link>
              </div>
            )}
            {/* <Link
              href={routes.nettrom.search}
              type="button"
              className="search-button-icon visible-xs"
              aria-label="Search"
            >
              <i className="fa fa-search"></i>
            </Link> */}
            <button
              type="button"
              className="navbar-toggle"
              aria-label="Menu"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              {openMenu ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
          <ul className="nav-account list-inline hidden-xs pull-right mt-[13px]">
            {(userInfo || user)?.token || verifyEmailSuccess ? (
              <li className={`dropdown ${isHovered && "open"}`}>
                <Link
                  data-toggle="dropdown"
                  className="user-menu fn-userbox dropdown-toggle flex"
                  to="#"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    className="fn-thumb mr-2"
                    alt="Avatar"
                    src={
                      (userInfo || user)?.image
                        ? (userInfo || user)?.image
                        : "/images/user.png"
                    }
                  />{" "}
                  <span>Cá nhân</span>{" "}
                  <i className="fa fa-caret-down ml-2 pt-1"></i>
                </Link>
                <ul
                  className="dropdown-menu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <Link rel="nofollow" to="/secure/Dashboard">
                      <i className="fa fa-user"></i> Trang cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link rel="nofollow" to="/admin/ManageManga">
                      <i className="fa fa-tachometer"></i> Bảng điều khiển
                    </Link>
                  </li>
                  <li>
                    <Link rel="nofollow" to="/secure/ComicFollowed">
                      <i className="fa fa-book"></i> Truyện theo dõi
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="nofollow"
                      className="user-logout"
                      to="/"
                      onClick={logoutHandle}
                    >
                      <i className="fa fa-sign-out"></i> Thoát
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="login-link">
                  <NavLink rel="nofollow" to="/Login">
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="register-link">
                  <NavLink rel="nofollow" to="/Register">
                    Đăng ký
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-collapse">
        <div className="search-box comicsearchbox">
          <SearchInput />
        </div>
        <MainNav />
        <ul className="nav-account list-inline">
          {(userInfo || user)?.token || verifyEmailSuccess ? (
            <li className={`dropdown ${isHovered && "open"}`}>
              <Link
                data-toggle="dropdown"
                className="user-menu fn-userbox dropdown-toggle flex"
                to="#"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="fn-thumb mr-2 mt-3"
                  alt="Avatar"
                  src={
                    (userInfo || user)?.image
                      ? (userInfo || user)?.image
                      : "/images/user.png"
                  }
                />{" "}
                <span>Cá nhân</span>{" "}
                <i className="fa fa-caret-down ml-2 pt-1 mt-3"></i>
              </Link>
              <ul
                className="dropdown-menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <li>
                  <Link rel="nofollow" to="/secure/Dashboard">
                    <i className="fa fa-user"></i> Trang cá nhân
                  </Link>
                </li>
                <li>
                  <Link rel="nofollow" to="/admin/ManageManga">
                    <i className="fa fa-tachometer"></i> Bảng điều khiển
                  </Link>
                </li>
                <li>
                  <Link rel="nofollow" to="/secure/ComicFollowed">
                    <i className="fa fa-book"></i> Truyện theo dõi
                  </Link>
                </li>
                <li>
                  <Link
                    rel="nofollow"
                    className="user-logout"
                    to="/"
                    onClick={logoutHandle}
                  >
                    <i className="fa fa-sign-out"></i> Thoát
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="login-link">
                <NavLink rel="nofollow" to="/Login">
                  Đăng nhập
                </NavLink>
              </li>
              <li className="register-link">
                <NavLink rel="nofollow" to="/Register">
                  Đăng ký
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
