import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { Input2 } from "../../Components/UsedInputs";
import { InlineError } from "../../Components/Notfications/Error";
import { useDropzone } from "react-dropzone";
import { uploadProfileService } from "../../Redux/APIs/ImageUploadService";

function UserProfile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const [loading, setLoading] = useState(false);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ProfileValidation) });
  const onSubmit = (data) => {
    const fullName = data.lastName
      ? data.firstName + " " + data.lastName
      : data.firstName;
    dispatch(updateProfileAction({ fullName: fullName, image: imageUrl }));
  };

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      file.append("userId", userInfo._id);
      const data = await uploadProfileService(file, setLoading);
      // console.log(data);
      setImageUrl(data.url);
    },
    [setImageUrl, userInfo._id]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });

  // useEffect
  useEffect(() => {
    if (userInfo?.token) {
      if (userInfo?.fullName?.includes(" ")) {
        let parts = userInfo?.fullName.split(" ");
        let lastName = parts[parts.length - 1];
        let firstName = parts.slice(0, -1).join(" ");
        setValue("firstName", firstName);
        setValue("lastName", lastName);
      } else {
        setValue("firstName", userInfo?.fullName);
        setValue("lastName", "");
      }
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch]);
  return (
    <div className="account-info clearfix">
      <h2 className="posttitle">
        Cập nhật tài khoản{" "}
        <span>
          (<span>*</span>) bắt buộc
        </span>
      </h2>
      <div className="account-form clearfix">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)} className="col-sm-9">
            <div id="ctl00_mainContent_divUserName" className="form-group">
              <label
                htmlFor="ctl00_mainContent_txtName"
                className="control-label"
              >
                Tài khoản
              </label>
              <input
                name="ctl00$mainContent$txtName"
                type="text"
                value={userInfo.email}
                maxLength="100"
                id="ctl00_mainContent_txtName"
                disabled="disabled"
                tabIndex="10"
                className="aspNetDisabled form-control"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="ctl00_mainContent_txtEmail"
                className="control-label"
              >
                Địa chỉ email
              </label>
              <input
                name="ctl00$mainContent$txtEmail"
                type="text"
                value={userInfo.email}
                id="ctl00_mainContent_txtEmail"
                disabled="disabled"
                tabIndex="10"
                className="aspNetDisabled form-control"
              />
            </div>
            <div className="row">
              <div className="col-xs-6">
                <div className="form-group">
                  <label
                    htmlFor="ctl00_mainContent_txtFirstName"
                    className="control-label"
                  >
                    Tên <span>*</span>
                  </label>
                  <Input2
                    placeholder=""
                    type="text"
                    bg={true}
                    name="firstName"
                    register={register("firstName")}
                  />
                  {errors.firstName && (
                    <InlineError text={errors.firstName.message} />
                  )}
                  {/* <input
                    name="ctl00$mainContent$txtFirstName"
                    type="text"
                    value="kimochi"
                    maxLength="100"
                    id="ctl00_mainContent_txtFirstName"
                    className="form-control"
                    onChange={handleChange}
                  />
                  <span
                    id="ctl00_mainContent_FirstNameRequired"
                    className="error"
                    style={{ display: "none" }}
                  >
                    Vui lòng nhập Tên
                  </span> */}
                </div>
              </div>
              <div className="col-xs-6">
                <div className="form-group">
                  <label
                    htmlFor="ctl00_mainContent_txtLastName"
                    className="control-label"
                  >
                    Họ <span>*</span>
                  </label>
                  <Input2
                    placeholder=""
                    type="text"
                    bg={true}
                    name="lastName"
                    register={register("lastName")}
                  />
                  {/* <input
                    name="ctl00$mainContent$txtLastName"
                    type="text"
                    value="ứ ứ"
                    maxLength="100"
                    id="ctl00_mainContent_txtLastName"
                    className="form-control"
                    onChange={handleChange}
                  />
                  <span
                    id="ctl00_mainContent_LastNameRequired"
                    className="error"
                    style={{ display: "none" }}
                  >
                    Vui lòng nhập Họ
                  </span> */}
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <label
                htmlFor="ctl00_mainContent_ddGender"
                className="control-label"
              >
                Giới tính<span>*</span>
              </label>
              <select
                name="ctl00$mainContent$ddGender"
                id="ctl00_mainContent_ddGender"
                className="form-control"
                defaultValue="M"
              >
                <option value="O">Khác</option>
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </select>
            </div> */}
            <div className="button-wrap">
              <input
                type="submit"
                name="submit"
                disabled={isLoading}
                value={
                  //if loading show loading
                  isLoading ? "Loading..." : "Cập nhật"
                }
                id="ctl00_mainContent_btnUpdate"
                className="btn btn-primary"
              />
            </div>
          </form>
          <div className="col-sm-3">
            <div
              {...getRootProps()}
              id="ctl00_mainContent_divAvatar"
              className="form-group avatar-control"
            >
              <label className="control-label">Avatar</label>
              <div className="forminput">
                <img
                  alt={userInfo ? userInfo?.fullName : ""}
                  src={imageUrl ? imageUrl : "/images/user.png"}
                  className="avatar user-img mr-3 float-left"
                />
                <label
                  htmlFor="ctl00_mainContent_fileUploader"
                  disabled={loading}
                  className="btn btn-danger"
                >
                  {loading ? "Loading..." : "Upload ảnh"}
                </label>
                {loading ? (
                  <></>
                ) : (
                  <input
                    id="fileUploader"
                    type="file"
                    accept="image/*"
                    {...getInputProps()}
                    style={{ display: "none" }}
                  />
                )}

                {/* <input
                  type="file"
                  name="ctl00$mainContent$fileUploader"
                  id="ctl00_mainContent_fileUploader"
                  className="hidden"
                  accept=".jpg,.jpeg,.gif,.png"
                  // onChange="showImage(event)"
                /> */}
                <span className="avatar-note mt-4 block">
                  {isDragActive ? (
                    "Drop it like it's hot!"
                  ) : isDragReject ? (
                    "Unsupported file type..."
                  ) : (
                    <>jpg,jpeg,gif,png &lt;2MB</>
                  )}
                  {/* jpg,jpeg,gif,png &lt;2MB */}
                </span>
                <div className="avatar-note error">
                  Avatar tục tĩu sẽ bị khóa vĩnh viễn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
