import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getChapterInfoAction,
  updateChapterAction,
} from "../../../Redux/Actions/MangasActions";
import { useForm } from "react-hook-form";
import { chapterValidation } from "../../../Components/Validation/MangaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input2, Message } from "../../../Components/UsedInputs";
import { InlineError } from "../../../Components/Notfications/Error";
import UploderDesc from "../../../Components/UploderDesc";
import toast from "react-hot-toast";

function EditChapter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const mangaName = location.state?.mangaName;
  const mangaId = location.state?.mangaId;
  const [success, setSuccess] = useState(false);
  const [isMangaId, setIsMangaId] = useState();
  const oldMangaIdRef = useRef();
  const oldMangaNameRef = useRef();
  useEffect(() => {
    if (mangaId !== undefined) {
      oldMangaIdRef.current = mangaId;
    }
    if (mangaName !== undefined) oldMangaNameRef.current = mangaName;
  }, [mangaId, mangaName]);
  const oldMangaId = oldMangaIdRef.current;
  const oldMangaName = oldMangaNameRef.current;
  const { isError, chapterInfo } = useSelector((state) => state.getChapterInfo);
  // const imageText = chapter?.image
  //   .map((image) => `<img src="${image.trim()}"/>`)
  //   .join("\n");

  const {
    isLoading,
    isError: updateError,
    isSuccess,
    mangaid,
  } = useSelector((state) => state.updateChapter);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(chapterValidation) });

  const values = watch();

  // on submit
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      updateChapterAction(mangaId || isMangaId, id, {
        ...data,
      })
    );
  };

  useEffect(() => {
    if (chapterInfo?._id !== id) {
      dispatch(getChapterInfoAction(id, mangaId || oldMangaId));
    } else {
      setValue("chapName", chapterInfo?.chapName);
      setValue("title", chapterInfo?.title);
      const desc = chapterInfo?.image
        ?.map((src) => `<img src='${src}'/>`)
        .join("");
      setValue("desc", desc);
    }
    if (isSuccess) {
      setSuccess(true);
      if (mangaid !== undefined) setIsMangaId(mangaid);
      dispatch({ type: "UPDATE_CHAPTER_RESET" });
    }
    if (updateError) {
      toast.error(isError);
      dispatch({ type: "UPDATE_MANGA_RESET" });
    }
    if (isError) {
      navigate("/notpound");
    }
  }, [
    dispatch,
    id,
    isError,
    navigate,
    chapterInfo,
    mangaId,
    oldMangaId,
    setValue,
    updateError,
    isSuccess,
    mangaid,
  ]);
  return (
    <AdminLayout>
      {!success && (
        <div className="account-info clearfix">
          <div className="account-form clearfix">
            <div className="flex justify-between">
              <h2 className="posttitle">{mangaName}</h2>
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
                    // onChange={(e) => setCommentContent(e.target.value)}
                  ></textarea> */}
                  <Message
                    placeholder="Nội dung chương"
                    name="desc"
                    register={{ ...register("desc") }}
                    height={"h-96"}
                    value={values.desc?.match(/<img[^>]*>/g)?.join("\n")}
                  />
                </div>
              </div>
              <div className="form-group pb-16">
                <div className="col-sm-2 text-end mt-2 pr-0"></div>
                <div className="col-sm-10">
                  <button
                    // type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary btnUpdateEditor"
                  >
                    {isLoading ? "Waiting..." : "Cập nhật"}
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
              Đã cập nhật chap thành công
            </div>
            <div className="finish-page flex justify-evenly">
              <div className="item text-center">
                <Link
                  to={`/admin/ManageManga/Update/${isMangaId}`}
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
                  to={`/admin/ManageManga/ManageChapter/${isMangaId}`}
                  type="button"
                  className="btn btn-success"
                  title="Danh sách chương"
                >
                  <i className="fa fa-list"></i> Danh sách chương
                </Link>
              </div>
              <div className="item text-center">
                <Link
                  to="#"
                  type="bu type="
                  className="btn btn-success"
                  title="Cập nhật chương"
                  onClick={() => setSuccess(false)}
                >
                  <i className="fa fa-pencil-square"></i> Cập nhật chương
                </Link>
              </div>
              <div className="item text-center">
                <Link
                  to={`/admin/ManageManga/CreateChapter/${isMangaId}`}
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

export default EditChapter;
