import React from "react";
import Layout from "../../Layout/Layout";
import TopTitles from "../../Components/Home/TopTitles";
import ReadingHistory from "../../Components/Home/ReadingHistory";
import FollowList from "../../Components/Home/FollowList";
import { Link, NavLink } from "react-router-dom";

function FollowManga() {
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
              to="/theo-doi"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Theo dõi</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          <div className="mrb10 Module Module-233">
            <div className="ModuleContent">
              <h1 className="page-title">
                Truyện đang theo dõi <em className="fa fa-angle-right" />
              </h1>
              <div className="mrt15 visited-tab">
                <ul
                  className="comment-nav text-center"
                  style={{ fontSize: 16, marginBottom: 15 }}
                >
                  <li className="active">
                    <Link to="/lich-su">Mới cập nhật</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <FollowList />
        </div>
        <div id="ctl00_divRight" className="right-side col-md-4 cmszone">
          <ReadingHistory />
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default FollowManga;
