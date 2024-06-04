import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./style.css";
import MainNav from "./Navbar/MainNav";

function Layout({ children }) {
  return (
    <>
      <div className="dark text-white">
        <Navbar />
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
        <Footer />
      </div>
    </>
  );
}

export default Layout;
