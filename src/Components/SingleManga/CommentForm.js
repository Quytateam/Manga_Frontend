import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentValidation } from "../Validation/MangaValidation";
import { Message } from "../UsedInputs";
import { InlineError } from "../../Components/Notfications/Error";
import { createCommentAction } from "../../Redux/Actions/MangasActions";
import toast from "react-hot-toast";

function CommentForm({ manganame, chapname, chapid, setIsShow }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isLoading, isError } = useSelector((state) => state.createComment);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CommentValidation) });
  // on submit
  const onSubmit = (data) => {
    dispatch(
      createCommentAction({
        comment: data.comment,
        manganame: manganame,
        chapname: chapname,
        chapid: chapid,
      })
    );
    setIsShow(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_COMMNENT_RESET" });
    }
  }, [isError, dispatch]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment_form">
      <Message
        name="comment"
        register={{ ...register("comment") }}
        placeholder="Nội dung bình luận ...."
      />
      {errors?.comment && <InlineError text={errors?.comment.message} />}
      {/* <textarea
        id="comment_content"
        className="form-control"
        placeholder="Nội dung bình luận"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      ></textarea> */}
      <div className="comment-info">
        <input
          id="comment_name"
          className="comment-name form-control"
          maxLength="50"
          type="text"
          placeholder="Họ tên (Bắt buộc)"
          value={userInfo?.fullName}
          disabled="disabled"
        />
        <input
          id="comment_email"
          className="comment-email form-control"
          maxLength="100"
          type="text"
          placeholder="Email"
          value={userInfo?.email}
          disabled="disabled"
        />
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Gửi
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
