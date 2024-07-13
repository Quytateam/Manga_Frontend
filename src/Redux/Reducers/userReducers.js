import * as userConstants from "../Constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { isLoading: true };
    case userConstants.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_LOGIN_RESET:
      return {};
    case userConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userGoogleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_GOOGLE_LOGIN_REQUEST:
      return { isLoading: true };
    case userConstants.USER_GOOGLE_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_GOOGLE_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_GOOGLE_LOGIN_RESET:
      return {};
    case userConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { isLoading: true };
    case userConstants.USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userVerifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_VERIFYEMAIL_REQUEST:
      return { isLoading: true };
    case userConstants.USER_VERIFYEMAIL_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.payload,
        isSuccess: true,
      };
    case userConstants.USER_VERIFYEMAIL_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_VERIFYEMAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const userRecoverPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_RECOVER_PASSWORD_REQUEST:
      return { isLoading: true };
    case userConstants.USER_RECOVER_PASSWORD_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_RECOVER_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_RECOVER_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// RESET PASSWORD
export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_RESET_PASSWORD_REQUEST:
      return { isLoading: true };
    case userConstants.USER_RESET_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case userConstants.USER_RESET_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userResendEmailVerificationTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_REQUEST:
      return { resendLoading: true };
    case userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_SUCCESS:
      return { resendLoading: false, resendSuccess: true };
    case userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_FAIL:
      return { resendLoading: false, resendError: action.payload };
    case userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_RESET:
      return {};
    default:
      return state;
  }
};

// GET USER INFO
export const userInfoReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_INFO_REQUEST:
      return { isLoading: true };
    case userConstants.USER_INFO_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.payload.user,
        comments: action.payload.commentList,
      };
    case userConstants.USER_INFO_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return { isLoading: true };
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// CHANGE PASSWORD
export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_PASSWORD_REQUEST:
      return { isLoading: true };
    case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };
    case userConstants.USER_CHANGE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// CCREATE PASSWORD
export const userCreatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CREATE_PASSWORD_REQUEST:
      return { isLoading: true };
    case userConstants.USER_CREATE_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };
    case userConstants.USER_CREATE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_CREATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// GET FOLLOW MANGA
export const userGetFollowMangasReducer = (
  state = {
    followMangas: [],
  },
  action
) => {
  switch (action.type) {
    case userConstants.GET_FOLLOW_MANGAS_REQUEST:
      return { isLoading: true };
    case userConstants.GET_FOLLOW_MANGAS_SUCCESS:
      return {
        isLoading: false,
        followMangas: action.payload.manga,
        totalMangas: action.payload.total,
      };
    case userConstants.GET_FOLLOW_MANGAS_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_FOLLOW_MANGAS_RESET:
      return {};
    default:
      return state;
  }
};

// GET ALL FOLLOW MANGAS
export const userGetAllFollowMangasReducer = (
  state = {
    allFollowMangas: [],
  },
  action
) => {
  switch (action.type) {
    case userConstants.GET_ALL_FOLLOW_MANGAS_REQUEST:
      return { isLoading: true };
    case userConstants.GET_ALL_FOLLOW_MANGAS_SUCCESS:
      return { isLoading: false, allFollowMangas: action.payload };
    case userConstants.GET_ALL_FOLLOW_MANGAS_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_ALL_FOLLOW_MANGAS_RESET:
      return {};
    default:
      return state;
  }
};

// GET COMMENT MANGA
export const userGetCommentMangasReducer = (
  state = {
    commentMangas: [],
  },
  action
) => {
  switch (action.type) {
    case userConstants.GET_COMMENT_MANGAS_REQUEST:
      return { isLoading: true };
    case userConstants.GET_COMMENT_MANGAS_SUCCESS:
      return {
        isLoading: false,
        commentMangas: action.payload.comment,
        totalComment: action.payload.total,
      };
    case userConstants.GET_COMMENT_MANGAS_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_COMMENT_MANGAS_RESET:
      return {};
    default:
      return state;
  }
};

// GET NOTIFICATION
export const userGetNotificationReducer = (
  state = {
    notificationList: [],
  },
  action
) => {
  switch (action.type) {
    case userConstants.GET_NOTIFICATION_REQUEST:
      return { isLoading: true };
    case userConstants.GET_NOTIFICATION_SUCCESS:
      return {
        isLoading: false,
        notificationList: action.payload,
      };
    case userConstants.GET_NOTIFICATION_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

// GET NOTIFICATION IS READ
export const userGetNotificationIsReadReducer = (
  state = {
    notificationIsReadList: [],
  },
  action
) => {
  switch (action.type) {
    case userConstants.GET_NOTIFICATION_IS_READ_REQUEST:
      return { isLoading: true };
    case userConstants.GET_NOTIFICATION_IS_READ_SUCCESS:
      return {
        isLoading: false,
        notificationIsReadList: action.payload,
      };
    case userConstants.GET_NOTIFICATION_IS_READ_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_NOTIFICATION_IS_READ_RESET:
      return {};
    default:
      return state;
  }
};

// HIDDEN NOTIFICATION
export const userHiddenNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.HIDDEN_NOTIFICATION_REQUEST:
      return { isLoading: true };
    case userConstants.HIDDEN_NOTIFICATION_SUCCESS:
      return { isLoading: false };
    case userConstants.HIDDEN_NOTIFICATION_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.HIDDEN_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

// SEEN NOTIFICATION
export const userSeenNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.SEEN_NOTIFICATION_REQUEST:
      return { isLoading: true };
    case userConstants.SEEN_NOTIFICATION_SUCCESS:
      return { isLoading: false };
    case userConstants.SEEN_NOTIFICATION_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.SEEN_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

// GET DATA READ
export const userGetDataReadReducer = (
  state = {
    dataRead: {},
  },
  action
) => {
  switch (action.type) {
    case userConstants.GET_DATA_READ_REQUEST:
      return { isLoading: true };
    case userConstants.GET_DATA_READ_SUCCESS:
      return {
        isLoading: false,
        dataRead: action.payload.dataRead,
        chapName: action.payload.chapName,
      };
    case userConstants.GET_DATA_READ_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_DATA_READ_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST:
      return { isLoading: true };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return { isLoading: false, users: action.payload };
    case userConstants.GET_ALL_USERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_ALL_USERS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// ADMIN DELETE USER
export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_USER_REQUEST:
      return { isLoading: true };
    case userConstants.DELETE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.DELETE_USER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN ENABLE USER
export const adminEnableUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.ENABLE_USER_REQUEST:
      return { isLoading: true };
    case userConstants.ENABLE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.ENABLE_USER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.ENABLE_USER_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN DELETE USER
export const adminSetAdminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.SET_ADMIN_USER_REQUEST:
      return { isLoading: true };
    case userConstants.SET_ADMIN_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.SET_ADMIN_USER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.SET_ADMIN_USER_RESET:
      return {};
    default:
      return state;
  }
};

// AUTO TIME READ
export const userAutoTimeReadReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.AUTO_TIME_READ_REQUEST:
      return { isLoading: true };
    case userConstants.AUTO_TIME_READ_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.AUTO_TIME_READ_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.AUTO_TIME_READ_RESET:
      return {};
    default:
      return state;
  }
};

// STOP CORN JOB
export const userStopCronJobReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.STOP_CORN_JOB_REQUEST:
      return { isLoading: true };
    case userConstants.STOP_CORN_JOB_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.STOP_CORN_JOB_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.STOP_CORN_JOB_RESET:
      return {};
    default:
      return state;
  }
};

// ADD FOLLOW MANGA
export const userFollowMangaReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.FOLLOW_MANGA_REQUEST:
      return { isLoading: true };
    case userConstants.FOLLOW_MANGA_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.FOLLOW_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.FOLLOW_MANGA_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE FOLLOW MANGA
export const userDeleteFollowMangaReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_FOLLOW_MANGA_REQUEST:
      return { isLoading: true };
    case userConstants.DELETE_FOLLOW_MANGA_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.DELETE_FOLLOW_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.DELETE_FOLLOW_MANGA_RESET:
      return {};
    default:
      return state;
  }
};

// SEND REQUEST
export const userSendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.SEND_REQUEST_REQUEST:
      return { isLoading: true };
    case userConstants.SEND_REQUEST_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.SEND_REQUEST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
