import React from "react";
import NettromLogo from "../../assets/nettrom-logo.png";
import { Link } from "react-router-dom";
import routes from "../../routes.ts";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div
            className="col-sm-4 copyright"
            itemType="http://schema.org/Organization"
          >
            <a itemProp="url" href="/">
              <img
                itemProp="logo"
                src={NettromLogo}
                width={150}
                style={{ aspectRatio: 5 }}
                alt="Logo"
              />
            </a>
            <div className="mrt10 row">
              <div className="col-xs-6">
                <Link href="/contact" rel="nofollow noopener">
                  Liên hệ bản quyền
                </Link>
              </div>
              <div className="col-xs-6">
                <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
              </div>
            </div>
            <p></p>
            <p>Copyright © 2023 NetTrom</p>
          </div>
          <div className="col-sm-8">
            <div className="link-footer">
              <h4>Từ khóa</h4>
              <ul>
                <li>
                  <Link target="_self" href="/">
                    Truyện tranh
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    Truyen tranh online
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    Đọc truyện tranh
                  </Link>
                </li>
                <li>
                  <Link
                    target="_self"
                    href={`${routes.nettrom.search}?order[followedCount]=desc#results`}
                  >
                    Truyện tranh hot
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    Truyện tranh hay
                  </Link>
                </li>
                <li>
                  <Link
                    target="_self"
                    href={`${routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}
                  >
                    Truyện ngôn tình
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    Manhwa
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    Manga
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    Manhua
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    truyenqq
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    mi2manga
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    doctruyen3q
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    toptruyen
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    cmanga
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    vlogtruyen
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    blogtruyen
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    truyentranhaudio
                  </Link>
                </li>
                <li>
                  <Link target="_self" href="/">
                    vcomi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
