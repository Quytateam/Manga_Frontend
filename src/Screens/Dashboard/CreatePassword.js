import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordValidation } from "../../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../Components/Notfications/Error";
import { Input } from "../../Components/UsedInputs";
import toast from "react-hot-toast";
import { createPasswordAction } from "../../Redux/Actions/userActions";

function CreatePassword() {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.userRecoverPassword
  );
  // validate user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ResetPasswordValidation) });
  // on submit
  const onSubmit = (data) => {
    dispatch(createPasswordAction(data));
  };
  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CREATE_PASSWORD_RESET" });
    }
    if (isError) {
      dispatch({ type: "USER_CREATE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, isError, dispatch, message, reset]);
  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)} className="col-sm-9">
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
            value={isLoading ? "Changing..." : "Tạo mật khẩu"}
            id="ctl00_mainContent_btnChangePassword"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreatePassword;
