import React from "react";
// import NettromLogo from "../../assets/nettrom-logo.png";
import MangaLogo from "../../assets/mangadex-logo.svg";
import { Link } from "react-router-dom";

function Footer({ setModalOpen }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div
            className="col-sm-4 copyright"
            itemType="http://schema.org/Organization"
          >
            <Link itemProp="url" to="/">
              <img
                itemProp="logo"
                src={MangaLogo}
                width={150}
                style={{ aspectRatio: 5 }}
                alt="Logo"
              />
            </Link>
            <div className="mrt10 row">
              <div className="col-xs-6">
                <Link to="/lien-he" rel="nofollow noopener">
                  Liên hệ bản quyền
                </Link>
              </div>
              <div className="col-xs-6">
                <Link onClick={() => setModalOpen(true)}>
                  Chính sách bảo mật
                </Link>
              </div>
            </div>
            <p></p>
            <p>Copyright © 2023 MangaDex</p>
          </div>
          <div className="col-sm-8">
            <div className="link-footer">
              <h4>Từ khóa</h4>
              <ul>
                <li>
                  <Link target="_self" to="/">
                    Truyện tranh
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    Truyen tranh online
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    Đọc truyện tranh
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/hot">
                    Truyện tranh hot
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/the-loai?status=-1&sort=11">
                    Truyện tranh hay
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/the-loai/ngon-tinh">
                    Truyện ngôn tình
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/the-loai/manhwa">
                    Manhwa
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/the-loai/manga">
                    Manga
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/the-loai/manhua">
                    Manhua
                  </Link>
                </li>
                {/* <li>
                  <Link target="_self" to="/">
                    truyenqq
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    mi2manga
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    doctruyen3q
                  </Link>
                </li> */}
                <li>
                  <Link target="_self" to="/the-loai/manhua?status=-1&sort=10">
                    toptruyen
                  </Link>
                </li>
                {/* <li>
                  <Link target="_self" to="/">
                    cmanga
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    vlogtruyen
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    blogtruyen
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    truyentranhaudio
                  </Link>
                </li>
                <li>
                  <Link target="_self" to="/">
                    vcomi
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
