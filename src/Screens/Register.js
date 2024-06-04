import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { Input } from "../Components/UsedInputs";
import { InlineError } from "../Components/Notfications/Error";
import { registerAction } from "../Redux/Actions/userActions";
// import toast from "react-hot-toast";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFalse, setIsFalse] = useState(false);
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );
  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };
  // useEffect
  useEffect(() => {
    if (isSuccess) {
      navigate("/VerifyEmail");
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      setIsFalse(true);
      dispatch({ type: "USER_REGISTER_RESET" });
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
              to="/Register"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Đăng ký</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="full-width col-sm-12">
          <div id="ctl00_mainContent_pnlRegister">
            <div
              id="ctl00_mainContent_pnlStandardRegister"
              className="Register-wrapper"
            >
              <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                  <div className="user-page clearfix">
                    <h1 className="postname">ĐĂNG KÝ</h1>
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
                      id="ctl00_mainContent_Register1_RegisterCtrl_pnlLContainer"
                      className="signup-wrapper"
                    >
                      <div className="form-group">
                        <Input
                          label="User Name"
                          placeholder=""
                          type="text"
                          name="fullName"
                          register={register("fullName")}
                        />
                        {errors.fullName && (
                          <InlineError text={errors.fullName.message} />
                        )}
                      </div>
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
                            to="/Login"
                          >
                            Đăng nhập
                          </NavLink>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            name="submit"
                            disabled={isLoading}
                            value={
                              //if loading show loading
                              isLoading ? "Loading..." : "Đăng ký"
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
                          Đăng ký thất bại. Vui lòng thử lại.
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

export default Register;
