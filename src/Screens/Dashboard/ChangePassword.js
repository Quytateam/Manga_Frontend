import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PasswordValidation } from "../../Components/Validation/UserValidation";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { Input } from "../../Components/UsedInputs";
import { InlineError } from "../../Components/Notfications/Error";

function ChangePassword() {
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userChangePassword
  );
  // validate user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(PasswordValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
    // console.log(data);
  };

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, isError, message, reset, dispatch]);
  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)} className="col-sm-9">
        <div className="form-group">
          <Input
            label="Mật khẩu cũ"
            placeholder=""
            type="password"
            name="oldPassword"
            register={register("oldPassword")}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
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
          {/* <label
            htmlFor="ctl00_mainContent_txtNewPassword"
            className="control-label"
          >
            Mật khẩu mới
          </label>
          <input
            name="ctl00$mainContent$txtNewPassword"
            type="password"
            id="ctl00_mainContent_txtNewPassword"
            className="form-control"
          />
          <span
            id="ctl00_mainContent_NewPasswordRequired"
            className="error"
            style={{ display: "none" }}
          >
            Vui lòng nhập Mật khẩu mới
          </span>
          <span
            id="ctl00_mainContent_NewPasswordRegex"
            className="error"
            style={{ display: "none" }}
          >
            Mật khẩu không đủ độ phức tạp.
          </span>
          <span
            id="ctl00_mainContent_NewPasswordRulesValidator"
            className="error"
            style={{ display: "none" }}
          ></span> */}
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
          {/* <label
            htmlFor="ctl00_mainContent_txtConfirmNewPassword"
            className="control-label"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            name="ctl00$mainContent$txtConfirmNewPassword"
            type="password"
            id="ctl00_mainContent_txtConfirmNewPassword"
            className="form-control"
          />
          <span
            id="ctl00_mainContent_ConfirmNewPasswordRequired"
            className="error"
            style={{ display: "none" }}
          >
            Vui lòng Xác nhận mật khẩu mới
          </span>
          <span
            id="ctl00_mainContent_NewPasswordCompare"
            className="error"
            style={{ display: "none" }}
          >
            Xác nhận mật khẩu mới không hợp lệ
          </span> */}
        </div>
        <div className="form-group">
          <input
            disabled={isLoading}
            type="submit"
            name="ctl00$mainContent$btnChangePassword"
            value={isLoading ? "Changing..." : "Đổi mật khẩu"}
            id="ctl00_mainContent_btnChangePassword"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
