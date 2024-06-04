import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecoverPasswordValidation } from "../Components/Validation/UserValidation";
import { useDispatch, useSelector } from "react-redux";
import { recoverPasswordAction } from "../Redux/Actions/userActions";
import { InlineError } from "../Components/Notfications/Error";
import { Input2 } from "../Components/UsedInputs";

function RecoverPassword() {
  const dispatch = useDispatch();
  const [isFalse, setIsFalse] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userRecoverPassword
  );
  // validate user
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RecoverPasswordValidation) });
  const values = watch();
  // on submit
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(recoverPasswordAction(data));
  };
  // useEffect
  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      setIsFalse(false);
      dispatch({ type: "USER_RECOVER_PASSWORD_RESET" });
    }
    if (isError) {
      setSuccess(false);
      setIsFalse(true);
      dispatch({ type: "USER_RECOVER_PASSWORD_RESET" });
    }
  }, [isSuccess, isError, dispatch]);
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
              <span itemProp="name">Quên mật khẩu</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="full-width min-h-screen col-sm-12">
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6 top-32">
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_pnlRecover"
                className="signup-wrapper"
              >
                <div className="form-group">
                  <label
                    htmlFor="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_UserName"
                    className="control-label"
                  >
                    Vui lòng nhập Email
                  </label>
                  {/* <input
                    name="Email"
                    type="text"
                    maxLength="100"
                    className="form-control"
                  ></input> */}
                  <Input2
                    placeholder=""
                    type="email"
                    name="email"
                    register={register("email")}
                  />
                  {errors.email && <InlineError text={errors.email.message} />}
                  {/* <span
                    id="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_UserNameRequired"
                    className="error hidden"
                    // className="error inline-block"
                  >
                    Vui lòng nhập Email.
                  </span>
                  <span
                    id="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_regexEmail"
                    className="error hidden"
                  >
                    Email không hợp lệ
                  </span> */}
                </div>
                {/* <div
                  id="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_divCaptcha"
                  className="form-group"
                >
                  <div id="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_captcha">
                    <span>
                      <div
                        className="cf-turnstile"
                        data-sitekey="0x4AAAAAAAVGfU3iutbsmtVI"
                      >
                        <iframe
                          src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/b/turnstile/if/ov2/av0/rcv0/0/e979r/0x4AAAAAAAVGfU3iutbsmtVI/auto/normal"
                          allow="cross-origin-isolated; fullscreen"
                          sandbox="allow-same-origin allow-scripts allow-popups"
                          id="cf-chl-widget-e979r"
                          tabIndex="0"
                          title="Widget containing a Cloudflare security challenge"
                          className="border-none overflow-hidden w-300 h-65"
                          //   style="border: none; overflow: hidden; width: 300px; height: 65px;"
                        ></iframe>
                      </div>
                    </span>
                  </div>
                </div> */}
                <div className="form-group">
                  <input
                    type="submit"
                    name="submit"
                    value={isLoading ? "Loading..." : "Xác nhận"}
                    disabled={isLoading}
                    id="ctl00_mainContent_PasswordRecovery1_UserNameContainerID_SubmitButton"
                    className="btn btn-primary"
                  ></input>
                </div>
              </form>
              {success && (
                <span
                  id="ctl00_mainContent_lblMailError"
                  className="alert alert-success"
                >
                  {`Phản hồi đã được gửi tới email ${values?.email}. Vui lòng kiểm tra email để tiếp
                tục bước tiếp theo.`}
                </span>
              )}

              {isFalse && (
                <span
                  id="ctl00_mainContent_lblMailError"
                  className="alert alert-danger"
                >
                  Email không đúng. Vui lòng nhập lại email.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RecoverPassword;
