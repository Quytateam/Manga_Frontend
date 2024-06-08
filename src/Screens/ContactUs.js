import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import TopTitles from "../Components/Home/TopTitles";

function ContactUs() {
  return (
    <Layout>
      <div id="ctl00_divCenter" className="center-side col-md-8">
        {" "}
        <div className="Module Module-230">
          {" "}
          <div className="ModuleContent">
            {" "}
            <h1 className="page-title">
              Liên hệ <em className="fa fa-angle-right"></em>{" "}
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="Module Module-178">
          {" "}
          <p>
            Chào bạn! Chúng tôi rất vui mừng khi bạn đang xem xét liên hệ với
            chúng tôi. Tại đây, chúng tôi rất trân trọng mọi ý kiến, góp ý và
            câu hỏi của bạn. Hãy cảm thấy tự do để liên hệ với chúng tôi bất cứ
            lúc nào.
          </p>{" "}
          <h2>Thông tin liên hệ cơ bản</h2>{" "}
          <p>
            Bạn có thể kết nối với chúng tôi thông qua mạng xã hội. Chúng tôi có
            mặt trên{" "}
            <Link
              rel="nofollow"
              target="_blank"
              to="https://www.facebook.com/profile.php?id=100023998493577"
            >
              Facebook
            </Link>
            , nơi bạn có thể cập nhật thông tin mới nhất, tham gia thảo luận và
            nhận thông báo về truyện tranh mới sớm nhất. Đừng ngần ngại liên hệ
            với chúng tôi. Chúng tôi sẵn sàng hỗ trợ bạn và tạo ra trải nghiệm
            tốt nhất cho bạn trên MangaDex. Cảm ơn bạn đã ủng hộ chúng tôi!
            Chúng tôi sẵn sàng hỗ trợ bạn mọi lúc, 24/7.
          </p>{" "}
          <h2>Chúng tôi cam kết</h2>{" "}
          <p>
            Chúng tôi sẽ luôn lắng nghe ý kiến của bạn và xem xét mọi góp ý một
            cách nghiêm túc. Chúng tôi sẽ cố gắng giải quyết mọi câu hỏi hoặc
            vấn đề một cách nhanh chóng và hiệu quả. Sự riêng tư của bạn rất
            quan trọng đối với chúng tôi, và thông tin liên hệ của bạn sẽ được
            bảo mật.
          </p>{" "}
        </div>{" "}
        <div className="Module Module-280">
          {" "}
          <div className="ModuleContent">
            {" "}
            <h2 className="mrt10 mrb5">Bình luận facebook</h2>{" "}
            <div className="lazy-module" data-type="facebook">
              {" "}
              <div
                className="fb-comments fb_iframe_widget fb_iframe_widget_fluid_desktop"
                data-width="100%"
                data-numposts="20"
                data-colorscheme="light"
                data-href=""
                fb-xfbml-state="rendered"
                style={{ width: "100%" }}
              >
                <span
                  style={{
                    verticalAlign: "top",
                    width: "100%",
                    height: "0px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    name="f40b238ca3dba3a2d"
                    width="1000px"
                    height="100px"
                    data-testid="fb:comments Facebook Social Plugin"
                    title="fb:comments Facebook Social Plugin"
                    frameBorder="0"
                    allowtransparency="true"
                    allowFullScreen="true"
                    scrolling="no"
                    allow="encrypted-media"
                    style={{
                      border: "none",
                      visibility: "visible",
                      width: "0px",
                      height: "0px",
                    }}
                  ></iframe>
                </span>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="right-side col-md-4 cmszone" id="ctl00_divRight">
        <TopTitles />
      </div>
    </Layout>
  );
}

export default ContactUs;
