import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { chapterValidation } from "../../../Components/Validation/MangaValidation.js";
import { Input2, Message } from "../../../Components/UsedInputs.js";
import { InlineError } from "../../../Components/Notfications/Error.js";
import UploderDesc from "../../../Components/UploderDesc.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createChapterAction } from "../../../Redux/Actions/MangasActions.js";

function CreateChapter() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const mangaName = location.state?.mangaName;
  const [chapId, setChapId] = useState();
  const [success, setSuccess] = useState(false);
  const { isLoading, isError, isSuccess, chapter } = useSelector(
    (state) => state.createChapter
  );
  const oldMangaNameRef = useRef();
  useEffect(() => {
    if (mangaName !== undefined) {
      oldMangaNameRef.current = mangaName;
    }
  }, [mangaName]);
  const oldMangaName = oldMangaNameRef.current;
  // validate manga
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(chapterValidation) });
  const values = watch();
  // on submit
  const onSubmit = (data) => {
    dispatch(
      createChapterAction(id, {
        ...data,
      })
    );
  };
  // useEffect
  useEffect(() => {
    // if its success then reset form and navigate to addManga
    if (isSuccess) {
      reset({
        chapName: "",
        title: "",
        desc: "",
      });
      if (chapter !== undefined) setChapId(chapter?._id);
      setSuccess(true);
      dispatch({ type: "CREATE_CHAPTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_CHAPTER_RESET" });
    }
  }, [isSuccess, isError, dispatch, reset, chapter]);
  return (
    <AdminLayout>
      {!success && (
        <div className="account-info clearfix">
          <div className="account-form clearfix">
            <div className="flex justify-between">
              <h2 className="posttitle">{mangaName || oldMangaName}</h2>
            </div>
            <div className="row">
              <div className="form-group pb-16">
                <div className="col-sm-2 text-end mt-2 pr-0">
                  <label
                    htmlFor="ctl00_mainContent_txtMangaName"
                    className="control-label"
                  >
                    Tên chương <span>(*)</span>
                  </label>
                </div>
                <div className="col-sm-10">
                  <Input2
                    placeholder="Tên chương"
                    type="text"
                    name="chapName"
                    register={register("chapName")}
                    bg={true}
                  />
                  {errors.chapName && (
                    <InlineError text={errors.chapName.message} />
                  )}
                </div>
              </div>
              <div className="form-group pb-16">
                <div className="col-sm-2 text-end mt-2 pr-0">
                  <label
                    htmlFor="ctl00_mainContent_txtMangaName"
                    className="control-label"
                  >
                    Tiêu đề chương
                  </label>
                </div>
                <div className="col-sm-10">
                  <Input2
                    placeholder="Tiêu đề chương"
                    type="text"
                    name="title"
                    register={register("title")}
                    bg={true}
                  />
                </div>
              </div>
              {/* <div className="form-group pb-16">
              <div className="col-sm-2 text-end mt-2 pr-0"></div>
              <div className="col-sm-10">
                <span className="custom-fileinput-button">
                  <i className="fa fa-plus"></i>
                  <span>Chọn ảnh</span>
                  <input
                    id="mangaThumbnailFileupload"
                    type="file"
                    name="mangaThumbnailFileupload"
                    accept="image/*"
                  />
                </span>
              </div>
            </div> */}
              <UploderDesc
                values={values}
                setValue={setValue}
                mangaName={mangaName || oldMangaName}
                chapName={values.chapName}
              />
              <div className="form-group pb-96">
                <div className="col-sm-2 text-end mt-2 pr-0">
                  <label
                    htmlFor="ctl00_mainContent_txtMangaName"
                    className="control-label"
                  >
                    Nội dung <span>(*)</span>
                  </label>
                </div>
                <div className="col-sm-10">
                  {/* <textarea
                  id="comment_content"
                  className="form-control h-96"
                  placeholder="Nội dung chương"
                  // value={}
                  // onChange={(e) => setCommentContent(e.target.value)}
                ></textarea> */}
                  <Message
                    placeholder="Nội dung chương"
                    name="desc"
                    register={{ ...register("desc") }}
                    height={"h-96"}
                    value={values.desc?.match(/<img[^>]*>/g)?.join("\n")}
                  />
                  {errors.desc && <InlineError text={errors.desc.message} />}
                </div>
              </div>
              <div className="form-group ">
                <div className="col-sm-2 text-end mt-2 pr-0"></div>
                <div className="col-sm-10">
                  <button
                    // type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary btnUpdateEditor"
                  >
                    {isLoading ? "Waiting..." : "Thêm mới"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="panel">
          <div className="panel-heading flex justify-between  ">
            <h1 className="posttitle">Thông báo</h1>{" "}
          </div>
          <div className="panel-body">
            <div className="alert alert-success">
              Đã thêm mới chap thành công
            </div>
            <div className="finish-page flex justify-evenly">
              <div className="item text-center">
                <Link
                  to={`/admin/ManageManga/Update/${id}`}
                  type="button"
                  className="btn btn-success"
                  title="Sửa truyện"
                >
                  <i className="fa fa-pencil"></i> Sửa truyện
                </Link>
              </div>
              {/* <div className="item text-center">
                <Link
                  to="#"
                  type="button"
                  className="btn btn-success"
                  title="Xem chương"
                >
                  <i className="fa fa-eye"></i> Xem chương
                </Link>
              </div> */}
              <div className="item text-center">
                <Link
                  to={`/admin/ManageManga/ManageChapter/${id}`}
                  type="button"
                  className="btn btn-success"
                  title="Danh sách chương"
                >
                  <i className="fa fa-list"></i> Danh sách chương
                </Link>
              </div>
              <div className="item text-center">
                <Link
                  to={`/admin/ManageManga/UpdateChapter/${chapId}`}
                  state={{ mangaName: mangaName, mangaId: id }}
                  type="button"
                  className="btn btn-success"
                  title="Cập nhật chương"
                >
                  <i className="fa fa-pencil-square"></i> Cập nhật chương
                </Link>
              </div>
              <div className="item text-center">
                <Link
                  to={`/admin/ManageManga/CreateChapter/${id}`}
                  state={{ mangaId: id, mangaName: mangaName || oldMangaName }}
                  onClick={() => setSuccess(false)}
                  type="button"
                  className="btn btn-success"
                  title="Thêm chương"
                >
                  <i className="fa fa-pencil-square-o"></i> Thêm chương
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default CreateChapter;
