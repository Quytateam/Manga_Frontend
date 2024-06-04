import React, { useState, useEffect } from "react";
import { StatusData } from "../../../Data/StatusData";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getMangaInfoAction,
  updateMangaAction,
} from "../../../Redux/Actions/MangasActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mangaValidation } from "../../../Components/Validation/MangaValidation";
import { Input2, Message } from "../../../Components/UsedInputs";
import { InlineError } from "../../../Components/Notfications/Error";
import TagInput from "../../../Components/Home/TagInput";
import Uploder from "../../../Components/Uploder";
import toast from "react-hot-toast";

// Hàm để lấy chiều cao của hình ảnh
const getImageHeight = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      resolve(img.height);
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};

function EditManga() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { extendGenres } = useSelector((state) => state.genreGetExtend);
  const { isError, mangaInfo } = useSelector((state) => state.getMangaInfo);
  const [selectedSort, setSelectedSort] = useState(mangaInfo?.status || "0");
  const [image, setImage] = useState("");
  const [genres, setGenres] = useState([]);
  const [hasGenres, setHasGenres] = useState(false);
  const [isGenres, setIsGenres] = useState(false);
  const [isHeight, setIsHeight] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mangaId, setMangaId] = useState();
  const {
    isLoading,
    isError: updateError,
    isSuccess,
    manga,
  } = useSelector((state) => state.updateManga);
  // validate manga
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(mangaValidation) });
  const values = watch();
  const handleSortClick = (e) => {
    setSelectedSort(e.target.value);
  };
  // on submit
  const onSubmit = (data) => {
    if (genres?.length === 0 && mangaInfo?.genre?.length === 0)
      setIsGenres(true);
    if (image && (genres?.length > 0 || mangaInfo?.genre?.length > 0)) {
      const labels =
        genres?.length > 0
          ? genres?.map((genre) => genre.label)
          : mangaInfo?.genre;
      dispatch(
        updateMangaAction(id, {
          ...data,
          image: image,
          genre: labels,
          status: Number(selectedSort),
        })
      );
    }
  };
  // const handleLinkClick = (e) => {
  //   e.preventDefault();
  //   window.location.href = `/admin/ManageManga/Update/${manga?._id}`;
  // };
  useEffect(() => {
    setGenres([]);
    setHasGenres(false);
    if (mangaInfo?._id !== id) {
      dispatch(getMangaInfoAction(id));
    } else {
      setValue("name", mangaInfo?.name);
      setValue("janpanName", mangaInfo?.janpanName);
      setValue("engName", mangaInfo?.engName);
      setValue("author", mangaInfo?.author);
      setValue("desc", mangaInfo?.desc);
      setImage(mangaInfo?.image);
      const fetchImageHeight = async () => {
        try {
          const height = await getImageHeight(mangaInfo?.image);
          setIsHeight(height);
        } catch (error) {
          console.error("Error fetching image height:", error);
        }
      };

      fetchImageHeight();
      // setIsHeight(getImageHeight(mangaInfo?.image));
      setHasGenres(true);
    }
    if (isSuccess) {
      setSuccess(true);
      if (manga !== undefined) setMangaId(manga?._id);
      dispatch({ type: "UPDATE_MANGA_RESET" });
    }
    if (isError) {
      navigate("/notpound");
    }
    if (updateError) {
      toast.error(isError);
      dispatch({ type: "UPDATE_MANGA_RESET" });
    }
  }, [
    dispatch,
    id,
    isError,
    navigate,
    setValue,
    mangaInfo,
    updateError,
    isSuccess,
    manga,
  ]);
  return (
    <AdminLayout>
      {!success && (
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
              <div className="form-group pb-16">
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
                  {extendGenres?.length > 0 && hasGenres && (
                    <TagInput
                      extendGenres={extendGenres}
                      genres={mangaInfo?.genre}
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
              Đã cập nhật truyện thành công
            </div>
            <div className="finish-page flex justify-evenly">
              <div className="item">
                <Link
                  // to={`/admin/ManageManga/Update/${manga?._id}`}
                  to="#"
                  type="button"
                  className="btn btn-success"
                  title="Sửa truyện"
                  onClick={() => setSuccess(false)}
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
      )}
    </AdminLayout>
  );
}

export default EditManga;
