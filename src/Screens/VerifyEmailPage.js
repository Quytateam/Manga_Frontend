import React, { useState, useEffect, useContext } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resendEmailVerificationTokenAction,
  verifyEmailAction,
} from "../Redux/Actions/userActions";
import toast from "react-hot-toast";
import ThemeContext from "../Layout/ThemeContext";

function VerifyEmailPage() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { resendError } = useSelector(
    (state) => state.userResendEmailVerificationToken
  );
  const {
    isLoading: verifyEmailLoading,
    isError: verifyEmailError,
    isSuccess: verifyEmailSuccess,
  } = useSelector((state) => state.userVerifyEmail);
  const handleChange = (index, e) => {
    if (isNaN(e.target.value)) return false;

    // Cập nhật giá trị của otp
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);

    // Kiểm tra xem tất cả các ô đã được nhập đúng chưa
    const isAllOtpEntered = updatedOtp.every((value) => value !== "");
    // Nếu đây là ô cuối cùng và tất cả các ô đã được nhập đúng
    if (index === otp.length - 1 && isAllOtpEntered) {
      // Thực hiện hành động
      dispatch(
        verifyEmailAction({
          userId: (userInfo || user)?._id,
          OTP: updatedOtp.join(""),
        })
      );
      setOtp(new Array(6).fill(""));
      const firstFilledInput = document.querySelector(
        '.code-input:not([value=""])'
      );
      if (firstFilledInput) {
        firstFilledInput.focus();
      }
    } else if (e.target.value && index < otp.length - 1) {
      // Chuyển đến ô nhập tiếp theo nếu có giá trị và không phải ô cuối cùng
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // const handleKeyDown = (index, e) => {
  //   if (e.key === "Backspace" && index > 0 && !e.target.value) {
  //     const prevInput = document.getElementById(`code-input-${index - 1}`);
  //     if (prevInput) prevInput.focus();
  //   }
  // };

  const handleKeyUp = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
      }
    }
  };

  //   const handleKeyUp = () => {
  //     const code = opt.join("");
  //     console.log("Entered code:", code);
  //   };

  const handleClick = () => {
    const firstEmptyInput = document.querySelector('.code-input[value=""]');
    if (firstEmptyInput) {
      firstEmptyInput.focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleResendEmailVerificationToken = () => {
    dispatch(
      resendEmailVerificationTokenAction({
        userId: (userInfo || user)?._id,
      })
    );
  };

  useEffect(() => {
    // Tìm ô đầu tiên chưa được nhập và tập trung vào nó
    const firstEmptyInput = document.querySelector('.code-input[value=""]');
    if (firstEmptyInput) {
      firstEmptyInput.focus();
    }
    if (verifyEmailSuccess) {
      toast.success(`Welcome back ${(userInfo || user)?.fullName}`);
      if ((userInfo || user)?.isAdmin) {
        navigate("/admin/ManageUser");
      } else if (userInfo || user) {
        navigate("/");
        // navigate("/profile");
      }
    }
  }, [verifyEmailSuccess, userInfo, user, navigate, dispatch]);

  return (
    <Layout>
      <div className="row">
        <div
          id="ctl00_divCenter"
          className="full-width col-sm-12"
          style={{ minHeight: "400px" }}
        >
          <div id="ctl00_mainContent_pnlLogin">
            <div
              id="ctl00_mainContent_pnlStandardLogin"
              className="login-wrapper"
            >
              <div className="row">
                <div className="col-sm-offset-2 col-sm-8">
                  <div className="user-page clearfix">
                    <h1 className="text-center">Verify your email address</h1>
                    <div className="code-section" onClick={handleClick}>
                      {otp.map((data, index) => (
                        <div
                          className={`code-box ${
                            focusedIndex === index ? "active" : ""
                          }`}
                          style={{
                            border: `2px solid ${
                              focusedIndex === index
                                ? "#627ad1"
                                : theme === "dark"
                                ? "#fff"
                                : "#000"
                            }`,
                          }}
                          key={index}
                        >
                          <span className="code-number">
                            <input
                              id={`code-input-${index}`}
                              theme
                              className={`max-w-10 code-input ${
                                theme === "dark" ? "text-white" : "text-black"
                              }`}
                              style={{
                                caretColor: `${
                                  theme === "dark" ? "white" : "black"
                                }`,
                              }}
                              type=""
                              maxLength="1"
                              disabled={verifyEmailLoading}
                              value={data}
                              onChange={(e) => handleChange(index, e)}
                              // onKeyDown={(e) => handleKeyDown(index, e)}
                              onKeyUp={(e) => handleKeyUp(index, e)}
                              onFocus={() => handleFocus(index)}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="footer-container">
                      <span style={{ lineHeight: "3.1" }}>
                        Make sure to keep this window open while check your
                        inbox.
                        <Link
                          to="#"
                          onClick={handleResendEmailVerificationToken}
                        >
                          Resend code
                        </Link>
                      </span>
                      {(resendError !== undefined ||
                        verifyEmailError !== undefined) && (
                        <span
                          style={{ lineHeight: "3.1" }}
                          id="ctl00_mainContent_login1_LoginCtrl_FailureText"
                          className="message alert alert-danger"
                        >
                          {resendError || verifyEmailError}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default VerifyEmailPage;
