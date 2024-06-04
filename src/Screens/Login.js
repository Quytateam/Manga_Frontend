import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { Input } from "../Components/UsedInputs";
import { InlineError } from "../Components/Notfications/Error";
import { loginAction } from "../Redux/Actions/userActions";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFalse, setIsFalse] = useState(false);
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );
  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };
  // useEffect
  useEffect(() => {
    if (isSuccess) {
      if (userInfo?.isVerified) {
        if (userInfo?.isAdmin) {
          navigate("/admin/ManageUser");
        } else if (userInfo) {
          navigate(-1);
          // navigate("/profile");
        }
        if (isSuccess) {
          toast.success(`Welcome back ${userInfo?.fullName}`);
        }
      } else {
        navigate("/VerifyEmail");
        dispatch({ type: "USER_LOGIN_RESET" });
      }
    }
    if (isError) {
      setIsFalse(true);
      // toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);
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
              to="/Login"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Đăng nhập</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="full-width col-sm-12">
          <div id="ctl00_mainContent_pnlLogin">
            <div
              id="ctl00_mainContent_pnlStandardLogin"
              className="login-wrapper"
            >
              <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                  <div className="user-page clearfix">
                    <h1 className="postname">ĐĂNG NHẬP</h1>
                    <div className="notify_block">
                      <div className="info">
                        <em className="fa fa-info-circle"></em>
                      </div>
                      <NavLink rel="nofollow noopener" to="/" className="mr-2">
                        <span className="dot">
                          <span className="ping"></span>
                        </span>
                        Nhấn vào đây
                      </NavLink>
                      để đăng nhập tự động và đồng bộ theo dõi từ site cũ
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      id="ctl00_mainContent_login1_LoginCtrl_pnlLContainer"
                      className="signup-wrapper"
                    >
                      <div className="form-group">
                        <Input
                          label="Email"
                          placeholder=""
                          type="email"
                          name="email"
                          register={register("email")}
                        />
                        {errors.email && (
                          <InlineError text={errors.email.message} />
                        )}
                        {/* <label
                          htmlFor="ctl00_mainContent_login1_LoginCtrl_UserName"
                          className="control-label"
                        >
                          Email
                        </label>
                        <input
                          name="Email"
                          type="text"
                          maxLength="100"
                          className="form-control"
                        ></input> */}
                      </div>
                      <div className="form-group">
                        <Input
                          label="Mật khẩu"
                          placeholder="Mật khẩu"
                          type="password"
                          name="password"
                          register={register("password")}
                        />
                        {errors.password && (
                          <InlineError text={errors.password.message} />
                        )}
                        {/* <label
                          htmlFor="ctl00_mainContent_login1_LoginCtrl_Password"
                          className="control-label"
                        >
                          Mật khẩu
                        </label>
                        <input
                          name="Password"
                          type="password"
                          maxLength="100"
                          className="form-control"
                          placeholder="Mật khẩu"
                        ></input> */}
                      </div>
                      <div className="login-action text-end">
                        <div className="form-group">
                          <NavLink
                            className="login-link login-to-recover"
                            to="/RecoverPassword"
                          >
                            Quên mật khẩu
                          </NavLink>
                          <NavLink
                            id="ctl00_mainContent_login1_LoginCtrl_lnkRegisterExtraLink"
                            className="login-link ml-4"
                            to="/Register"
                          >
                            Đăng ký mới
                          </NavLink>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            name="submit"
                            disabled={isLoading}
                            value={
                              //if loading show loading
                              isLoading ? "Loading..." : "Đăng nhập"
                            }
                            id="ctl00_mainContent_login1_LoginCtrl_Login"
                            className="btn btn-primary"
                          ></input>
                        </div>
                      </div>
                      {isFalse && (
                        <span
                          id="ctl00_mainContent_login1_LoginCtrl_FailureText"
                          className="message alert alert-danger"
                        >
                          Đăng nhập thất bại. Vui lòng thử lại.
                        </span>
                      )}
                    </form>
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

export default Login;
