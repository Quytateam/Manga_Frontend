import React, { useContext, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./style.css";
import MainNav from "./Navbar/MainNav";
import ThemeContext from "./ThemeContext";
import PrivacyPolicyModal from "../Components/Modals/PrivacyPolicyModal";
import { Link } from "react-router-dom";

function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={`${theme === "dark" ? "dark text-white" : ""}`}>
        <Navbar toggleTheme={toggleTheme} />
        <nav
          className="main-nav hidden-xs"
          id="mainNav"
          style={{ zIndex: 1000, position: "relative", top: "0px" }}
        >
          <div className="inner">
            <div className="container">
              <div
                className="notify_block"
                style={{ margin: 0, borderRadius: 0 }}
              >
                <div className="info">
                  <em className="fa fa-info-circle" />
                </div>
                <span className="error !block">Fact: Helloo mọi người.</span>
              </div>
              <MainNav />
            </div>
          </div>
        </nav>
        <main className="main">
          <div className="container">{children}</div>
        </main>
        <Footer setModalOpen={setModalOpen} />
        {modalOpen && <PrivacyPolicyModal setModalOpen={setModalOpen} />}
        <Link
          to="#"
          onClick={() => scrollTop()}
          id="back-to-top"
          style={{ display: "inline" }}
        >
          {" "}
          <i className="fa fa-angle-up"></i>{" "}
        </Link>
      </div>
    </>
  );
}

export default Layout;
