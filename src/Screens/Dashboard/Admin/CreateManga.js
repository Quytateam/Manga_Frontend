import React, { useState, useEffect } from "react";
import TagInput from "../../../Components/Home/TagInput";
import { StatusData } from "../../../Data/StatusData";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mangaValidation } from "../../../Components/Validation/MangaValidation";
import { Input2, Message } from "../../../Components/UsedInputs";
import { InlineError } from "../../../Components/Notfications/Error";
import Uploder from "../../../Components/Uploder";
import { useDispatch, useSelector } from "react-redux";
import { createMangaAction } from "../../../Redux/Actions/MangasActions";
import toast from "react-hot-toast";

function CreateManga() {
  const [selectedSort, setSelectedSort] = useState("0");
  const [image, setImage] = useState("");
  const [genres, setGenres] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isGenres, setIsGenres] = useState(false);
  const [mangaId, setMangaId] = useState();
  const { extendGenres } = useSelector((state) => state.genreGetExtend);
  const [isHeight, setIsHeight] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, manga } = useSelector(
    (state) => state.createManga
  );
  // validate manga
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(mangaValidation) });
  const values = watch();
  const handleSortClick = (e) => {
    setSelectedSort(e.target.value);
  };
  // on submit
  const onSubmit = (data) => {
    if (image === "") setIsImage(true);
    if (genres?.length === 0) setIsGenres(true);
    if (image && genres?.length > 0) {
      const labels = genres.map((genre) => genre.label);
      dispatch(
        createMangaAction({
          ...data,
          image: image,
          genre: labels,
          status: Number(selectedSort),
        })
      );
    }
  };
  // useEffect
  useEffect(() => {
    // if its success then reset form and navigate to addManga
    if (isSuccess) {
      reset({
        name: "",
        janpanName: "",
        engName: "",
        author: "",
        desc: "",
      });
      if (manga !== undefined) setMangaId(manga?._id);
      setGenres([]);
      setSelectedSort("0");
      setImage("");
      setSuccess(true);
      dispatch({ type: "CREATE_MANGA_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_MANGA_RESET" });
    }
  }, [isSuccess, isError, dispatch, reset, manga]);
  return (
    <AdminLayout>
      {!success && (
        <>
          <div className="account-info clearfix">
            <div className="account-form clearfix">
              <div className="row">
                <div className="form-group pb-16">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Tên truyện <span>(*)</span>
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <Input2
                      placeholder="Tên truyện."
                      type="text"
                      name="name"
                      register={register("name")}
                      bg={true}
                    />
                    {errors.name && <InlineError text={errors.name.message} />}
                  </div>
                </div>
                <Uploder
                  setImage={setImage}
                  mangaName={values.name}
                  isImage={isImage}
                  setIsHeight={setIsHeight}
                />
                {image && (
                  <div
                    className="form-group"
                    style={{ paddingBottom: `${isHeight + 18}px` }}
                  >
                    <div className="col-sm-2 text-end mt-2 pr-0"></div>
                    <div className="col-sm-10">
                      <div className="loadThumbnailManga">
                        <img alt="" src={image} className="img img-thumbnail" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group pb-16">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Tên tiếng nhật
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <Input2
                      placeholder="Tên tiếng nhật."
                      type="text"
                      name="janpanName"
                      register={register("janpanName")}
                      bg={true}
                    />
                  </div>
                </div>
                <div className="form-group pb-16">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Tên tiếng anh
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <Input2
                      placeholder="Tên tiếng anh."
                      type="text"
                      name="engName"
                      register={register("engName")}
                      bg={true}
                    />
                  </div>
                </div>
                <div className="form-group pb-16">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Tác giả <i className="fa fa-question-circle"></i>
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <Input2
                      placeholder="Tác giả."
                      type="text"
                      name="author"
                      register={register("author")}
                      bg={true}
                    />
                  </div>
                </div>
                <div className="form-group pb-20">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Thể loại <i className="fa fa-question-circle"></i>
                      <span>(*)</span>
                    </label>
                  </div>
                  <div className="col-sm-10">
                    {extendGenres?.length > 0 && (
                      <TagInput
                        extendGenres={extendGenres}
                        setGenres={setGenres}
                      />
                    )}
                    {isGenres && (
                      <InlineError text={"Thể loại truyện không để trống"} />
                    )}
                  </div>
                </div>
                <div className="form-group pb-64">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Mô tả <span>(*)</span>
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <Message
                      placeholder="Tóm tắt truyện"
                      name="desc"
                      register={{ ...register("desc") }}
                    />
                    {errors.desc && <InlineError text={errors.desc.message} />}
                  </div>
                </div>
                <div className="form-group pb-16">
                  <div className="col-sm-2 text-end mt-2 pr-0">
                    <label
                      htmlFor="ctl00_mainContent_txtMangaName"
                      className="control-label"
                    >
                      Trạng thái
                    </label>
                  </div>
                  <div className="col-sm-3">
                    <select
                      defaultValue={selectedSort}
                      className=" form-control changed-redirect"
                      onChange={handleSortClick}
                    >
                      {StatusData.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
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
                      {isLoading ? "Waiting..." : "Thêm mới"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {success && (
        <>
          <div className="panel">
            <div className="panel-heading flex justify-between">
              <h1 className="posttitle">Thông báo</h1>{" "}
            </div>
            <div className="panel-body">
              <div className="alert alert-success">
                Đã thêm mới truyện thành công
              </div>
              <div className="finish-page flex justify-evenly">
                <div className="item">
                  <Link
                    to={`/admin/ManageManga/Update/${mangaId}`}
                    type="button"
                    className="btn btn-success"
                    title="Sửa truyện"
                  >
                    <i className="fa fa-pencil"></i> Sửa truyện
                  </Link>
                </div>
                <div className="item">
                  <Link
                    to="/admin/ManageManga"
                    type="button"
                    className="btn btn-success"
                    title="Sửa truyện"
                  >
                    <i className="fa fa-book"></i> Danh sách truyện đã đăng
                  </Link>
                </div>
                <div className="item">
                  <Link
                    to={`/admin/ManageManga/ManageChapter/${mangaId}`}
                    type="button"
                    className="btn btn-success"
                    title="Danh sách chương"
                  >
                    <i className="fa fa-list"></i> Danh sách chương
                  </Link>
                </div>
                <div className="item">
                  <Link
                    to={`/admin/ManageManga/CreateChapter/${mangaId}`}
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
        </>
      )}
    </AdminLayout>
  );
}

export default CreateManga;
