import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Layout>
      <div className="row">
        <div id="ctl00_divCenter" className="full-width min-h-screen col-sm-12">
          <section className="error-404 not-found">
            <div className="entry-content">
              <div className="row">
                {" "}
                <div className="col-sm-4">
                  {" "}
                  <h1 className="error-title hidden-xs">404!</h1>{" "}
                </div>{" "}
                <div className="col-sm-8">
                  {" "}
                  <h2>Trang không tìm thấy</h2>{" "}
                  <p>
                    Trang của bạn đang truy cập không tồn tại hoặc đã bị xóa.
                    Hãy sử dụng chức năng tìm kiếm bên dưới để tìm đúng thông
                    tin bạn cần.
                  </p>{" "}
                </div>{" "}
              </div>
              <div className="search comicsearchbox">
                {" "}
                <div className="input-group">
                  {" "}
                  <input
                    type="text"
                    className="searchinput form-control"
                    placeholder="Tìm truyện..."
                    autoComplete="off"
                  />{" "}
                  <div className="input-group-btn">
                    {" "}
                    <input
                      type="submit"
                      value="Tìm kiếm"
                      className="searchbutton btn btn-default"
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>
              <h3 className="error-msg">Trong lúc này, bạn có thể...</h3>
              <p>
                Trong lúc chúng tôi đang giải quyết vấn đề của bạn, bạn có thể
                thử:
              </p>
              <ul>
                {" "}
                <li>Sửa lại đường dẫn truy cập.</li>{" "}
                <li>
                  Trở lại <Link to="/">trang chủ</Link>, và xem một vài truyện
                  mới đăng.
                </li>{" "}
                <li>
                  Sử dụng chức năng tìm kiếm <strong>bên trên</strong>.
                </li>{" "}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
