import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordValidation } from "../Components/Validation/UserValidation";
import { Input } from "../Components/UsedInputs";
import { InlineError } from "../Components/Notfications/Error";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetPasswordAction } from "../Redux/Actions/userActions";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const id = queryParams.get("id");
  const [isFalse, setIsFalse] = useState(false);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userResetPassword
  );
  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ResetPasswordValidation) });

  // on submit
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(resetPasswordAction(token, id, data));
  };
  // useEffect
  useEffect(() => {
    if (isSuccess) {
      navigate("/Login");
      toast.success(`Mật khảu thay đổi thành công. Vui lòng đăng nhập lại`);
      dispatch({ type: "USER_RESET_PASSWORD_RESET" });
    }
    if (isError) {
      setIsFalse(true);
      dispatch({ type: "USER_RESET_PASSWORD_RESET" });
    }
  }, [isSuccess, isError, navigate, dispatch]);
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
              to="#"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Thay đổi mật khẩu</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="full-width col-sm-12">
          <div id="ctl00_mainContent_pnlRestPassword">
            <div
              id="ctl00_mainContent_pnlStandardRestPassword"
              className="login-wrapper"
            >
              <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                  <div className="user-page clearfix">
                    <h1 className="postname">THAY ĐỔI MẬT KHẨU</h1>
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
                          label="Mật khẩu mới"
                          placeholder=""
                          type="password"
                          name="newPassword"
                          register={register("newPassword")}
                        />
                        {errors.newPassword && (
                          <InlineError text={errors.newPassword.message} />
                        )}
                      </div>
                      <div className="form-group">
                        <Input
                          label="Xác nhận mật khẩu mới"
                          placeholder=""
                          type="password"
                          name="confirmPassword"
                          register={register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <InlineError text={errors.confirmPassword.message} />
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          disabled={isLoading}
                          type="submit"
                          name="ctl00$mainContent$btnChangePassword"
                          value={
                            //if loading show loading
                            isLoading ? "Loading..." : "Đổi mật khẩu"
                          }
                          id="ctl00_mainContent_btnChangePassword"
                          className="btn btn-primary"
                        />
                      </div>
                    </form>
                    {isFalse && (
                      <span
                        id="ctl00_mainContent_login1_LoginCtrl_FailureText"
                        className="message alert alert-danger"
                      >
                        Thay đổi thất bại. Vui lòng thử lại.
                      </span>
                    )}
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

export default ResetPassword;
