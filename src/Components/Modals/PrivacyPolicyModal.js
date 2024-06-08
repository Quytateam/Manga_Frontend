import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicyModal({ setModalOpen }) {
  return (
    <div id="myModal" className="modal" style={{ display: "block" }}>
      {" "}
      <div className="modal-content2">
        {" "}
        <span className="close" onClick={() => setModalOpen(false)}>
          ×
        </span>{" "}
        <div style={{ color: "#000" }}>
          <h2>Chúng tôi là ai</h2>{" "}
          <p>
            Địa chỉ website là: <Link to="/">https://mangadex.com</Link>,
            website đọc truyện tranh online.{" "}
          </p>{" "}
          <h2>Thông tin cá nhân nào bị thu thập và tại sao thu thập</h2>{" "}
          <h3>Bình luận</h3>{" "}
          <p>
            Khi khách truy cập để lại bình luận trên trang web, chúng tôi thu
            thập dữ liệu được hiển thị trong biểu mẫu bình luận và cũng là địa
            chỉ IP của người truy cập và chuỗi User Agent của người dùng trình
            duyệt để giúp phát hiện spam.
          </p>{" "}
          <p>
            Một chuỗi ẩn danh được tạo từ địa chỉ email của bạn (còn được gọi là
            Hash) có thể được cung cấp cho dịch vụ{" "}
            <Link to="/" target="_blank" rel="noopener noreferrer">
              Gravatar
            </Link>{" "}
            để xem bạn có đang sử dụng nó hay không. Chính sách bảo mật của dịch
            vụ Gravatar có{" "}
            <Link to="/" target="_blank" rel="noopener noreferrer">
              tại đây
            </Link>
            . Sau khi chấp nhận bình luận của bạn, ảnh tiểu sử của bạn được hiển
            thị công khai trong ngữ cảnh bình luận của bạn.{" "}
          </p>{" "}
          <h3>Thông tin liên hệ</h3>{" "}
          <p>
            Chúng tôi không thu thập bất cứ thông tin liên hệ nào của bạn ngoại
            trừ tên và email dùng để bình luận.
          </p>{" "}
          <h3>Cookies</h3>{" "}
          <p>
            Trang chỉ sử dụng cookies để lưu thời hạn của quảng cáo để hiển thị
            số lượng nhất định, thời hạn chức năng sao lưu dữ liệu và xác thực
            người dùng. Chúng tôi chủ yếu sử dụng Cookie và Local Storage để lưu
            tên và email trong bình luận, các chương truyện bạn đã xem, bấm
            thích, đánh giá truyện, các bình luận của bạn, danh sách truyện yêu
            thích và danh sách truyện theo dõi.
          </p>{" "}
          <h3>Nội dung nhúng từ website khác</h3>{" "}
          <p>
            Các bài viết trên trang web này có thể bao gồm nội dung được nhúng
            (ví dụ: video, hình ảnh, bài viết, v.v.). Nội dung được nhúng từ các
            trang web khác hoạt động theo cùng một cách chính xác như khi khách
            truy cập đã truy cập trang web khác.
          </p>{" "}
          <p>
            Những website này có thể thu thập dữ liệu về bạn, sử dụng cookies,
            nhúng các trình theo dõi của bên thứ ba và giám sát tương tác của
            bạn với nội dung được nhúng đó, bao gồm theo dõi tương tác của bạn
            với nội dung được nhúng nếu bạn có tài khoản và đã đăng nhập vào
            trang web đó.
          </p>{" "}
          <h3>Phân tích</h3>{" "}
          <p>
            Chúng tôi sử dụng Google Analytics để phân tích lưu lượng truy cập.
          </p>{" "}
          <h2>Chúng tôi chia sẻ dữ liệu của bạn với ai</h2>{" "}
          <p>Chúng tôi không chia sẻ dữ liệu của bạn với bất kỳ ai.</p>{" "}
          <h2>Dữ liệu của bạn tồn tại bao lâu</h2>{" "}
          <p>
            Nếu bạn để lại bình luận, bình luận và siêu dữ liệu của nó sẽ được
            giữ lại vô thời hạn. Điều này là để chúng tôi có thể tự động nhận ra
            và chấp nhận bất kỳ bình luận nào thay vì giữ chúng trong khu vực
            đợi kiểm duyệt.
          </p>{" "}
          <p>
            Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có),
            chúng tôi cũng lưu trữ thông tin cá nhân mà họ cung cấp trong hồ sơ
            người dùng của họ. Tất cả người dùng có thể xem, chỉnh sửa hoặc xóa
            thông tin cá nhân của họ bất kỳ lúc nào (ngoại trừ họ không thể thay
            đổi tên người dùng của họ). Quản trị viên trang web cũng có thể xem
            và chỉnh sửa thông tin đó.
          </p>{" "}
          <h2>Các quyền nào của bạn với dữ liệu của mình</h2>{" "}
          <p>
            Nếu bạn có tài khoản trên trang web này hoặc đã để lại nhận xét, bạn
            có thể yêu cầu nhận tệp xuất dữ liệu cá nhân mà chúng tôi lưu giữ về
            bạn, bao gồm mọi dữ liệu bạn đã cung cấp cho chúng tôi. Bạn cũng có
            thể yêu cầu chúng tôi xóa mọi dữ liệu cá nhân mà chúng tôi lưu giữ
            về bạn. Điều này không bao gồm bất kỳ dữ liệu nào chúng tôi có nghĩa
            vụ giữ cho các mục đích hành chính, pháp lý hoặc bảo mật.
          </p>{" "}
          <h2>Các dữ liệu của bạn được gửi tới đâu</h2>{" "}
          <p>
            Các bình luận của khách (không phải là thành viên) có thể được kiểm
            tra thông qua dịch vụ tự động phát hiện spam.
          </p>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default PrivacyPolicyModal;
