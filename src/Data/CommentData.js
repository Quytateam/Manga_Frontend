export const CommentData = [
  {
    _id: "1",
    commentContent: "This is a comment on the manga.",
    userId: "616e9326b4f1a73f6f72c7d1", // ObjectId của người dùng
    mangaId: "1928r93741941943", // ObjectId của manga
    chapId: "7", // ObjectId của chapter (nếu có)
    feedBack: [
      {
        _id: "4",
        userId: "616e9326b4f1a73f6f72c7d3", // ObjectId của người dùng gửi feedback
        feedBackContent: "This is a feedback for the comment.",
        feedBackToId: "616e9326b4f1a73f6f72c7d1", // ObjectId của người nhận feedback
        isChecked: false,
      },
    ],
    isChecked: false,
  },
  {
    _id: "2",
    commentContent: "Great chapter!",
    userId: "616e9326b4f1a73f6f72c7d2", // ObjectId của người dùng
    mangaId: "1928r93741941943", // ObjectId của manga
    chapId: "7", // ObjectId của chapter
    feedBack: [],
    isChecked: true,
  },
  {
    _id: "3",
    commentContent: "Looking forward to the next update!",
    userId: "616e9326b4f1a73f6f72c7d4", // ObjectId của người dùng
    mangaId: "1928r93741941943", // ObjectId của manga
    chapId: null,
    feedBack: [
      {
        _id: "5",
        userId: "616e9326b4f1a73f6f72c7d5", // ObjectId của người dùng gửi feedback
        feedBackContent: "Glad you enjoyed it!",
        feedBackToId: "616e9326b4f1a73f6f72c7d4", // ObjectId của người nhận feedback
        isChecked: true,
      },
      {
        _id: "6",
        userId: "616e9326b4f1a73f6f72c7d6", // ObjectId của người dùng gửi feedback
        feedBackContent: "Can't wait for more!",
        feedBackToId: "616e9326b4f1a73f6f72c7d4", // ObjectId của người nhận feedback
        isChecked: false,
      },
    ],
    isChecked: false,
  },
];
