import * as yup from "yup";

const CommentValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Please enter a comment")
    .max(150, "Comment must be less than 150 characters"),
});

const FeedBackValidation = yup.object().shape({
  feedback: yup
    .string()
    .required("Please enter a comment")
    .max(150, "Comment must be less than 150 characters"),
});

const mangaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a manga name")
    .max(50, "manga name should be less than 50 characters"),
  desc: yup
    .string()
    .required("Please enter a manga description")
    .max(300, "Manga description should be less than 300 characters"),
});

const chapterValidation = yup.object().shape({
  chapName: yup
    .string()
    .required("Please enter a chapter name")
    .max(50, "Chapter name should be less than 50 characters"),
  desc: yup
    .string()
    .required("Please enter a chapter description")
    .min(20, "Chapter description should be least 20 characters"),
  // .max(300, "Chapter description should be less than 300 characters"),
});

export {
  CommentValidation,
  FeedBackValidation,
  mangaValidation,
  chapterValidation,
};
