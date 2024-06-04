import React, { useEffect, useState } from "react";
import { Input2, Textarea } from "../UsedInputs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createGenreAction,
  updateGenreAction,
} from "../../Redux/Actions/GenresActions";

function GenreModal({ modalOpen, setModalOpen, genre, setGenre, setActive }) {
  const [genreName, setGenreName] = useState("");
  const [genreDesc, setGenreDesc] = useState("");
  const [isExtend, setIsExtend] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.genreCreate
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.genreUpdate);
  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (genreName) {
      if (genre) {
        dispatch(
          updateGenreAction(genre?.id, {
            name: genreName,
            isExtend: isExtend,
            desc: genreDesc,
          })
        );
        setModalOpen(!modalOpen);
        setActive(true);
      } else {
        dispatch(
          createGenreAction({
            name: genreName,
            isExtend: isExtend,
            desc: genreDesc,
          })
        );
        setGenreName("");
        setGenreDesc("");
        setIsExtend("");
        setModalOpen(!modalOpen);
        setActive(true);
      }
    } else {
      toast.error("Làm ơn nhập tên thể loại");
    }
  };
  // useEffect
  useEffect(() => {
    // error
    if (isError || upError) {
      toast.error(isError || upError);
      dispatch({
        type: isError ? "CREATE_GENRE_RESET" : "UPDATE_GENRE_RESET",
      });
    }
    // success
    if (isSuccess || upSuccess) {
      dispatch({
        type: isSuccess ? "CREATE_GENRE_RESET" : "UPDATE_GENRE_RESET",
      });
    }
    if (genre) {
      setGenreName(genre?.name);
      setGenreDesc(genre?.desc);
      setIsExtend(genre?.isExtend);
    }
    // if modal is closed then set title to empty
    if (modalOpen === false) {
      setGenre();
      setGenreName("");
      setGenreDesc("");
      setIsExtend("");
    }
  }, [
    dispatch,
    isError,
    isSuccess,
    upSuccess,
    upError,
    genre,
    modalOpen,
    setGenre,
  ]);
  return (
    <div
      className={`modal fade ${modalOpen ? "in" : ""}`}
      id="modalMangaShare"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-b-0">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h1 className="nav nav-tabs main-tab lazy-module">
              {genre ? "Cập nhật" : "Tạo mới"}
            </h1>
          </div>
          <div className="modal-body form-horizontal py-0" id="modalbody">
            <form onSubmit={submitHandler} className="tab-content">
              <div className="form-group">
                <label
                  className="col-sm-3 control-label py-auto text-bold"
                  htmlFor="name"
                >
                  Tên thể loại
                </label>
                <div className="col-sm-9">
                  <Input2
                    placeholder={"Ex: Actions"}
                    type="text"
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-sm-3 control-label py-auto text-bold"
                  htmlFor="name"
                >
                  Mô tả thể loại
                </label>
                <div className="col-sm-9">
                  <Textarea
                    placeholder=""
                    value={genreDesc}
                    onChange={(e) => setGenreDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-sm-3 control-label py-auto text-bold"
                  htmlFor="name"
                >
                  Mở rộng
                </label>
                <div className="col-sm-9">
                  <select
                    value={isExtend}
                    className=" form-control changed-redirect"
                    onChange={(e) => setIsExtend(e.target.value)}
                  >
                    <option value="">Nguyên bản</option>
                    <option value="Extend">Nâng cao</option>
                  </select>
                </div>
              </div>
              <div className="form-group pb-16">
                <div className="col-sm-3 text-end mt-2 pr-0"></div>
                <div className="col-sm-9">
                  <button
                    type="submit"
                    disabled={isLoading || upLoading}
                    className="btn btn-primary btnUpdateEditor"
                  >
                    {isLoading || upLoading
                      ? "Loading..."
                      : genre
                      ? "Cập nhật"
                      : "Tạo mới"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreModal;
