import * as userConstants from "../Constants/userConstants";
import * as userAPI from "../APIs/userServices";
import * as genresConstants from "../Constants/GenresConstants";
import * as mangasConstants from "../Constants/MangasConstants";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import {
  getMangaByNameAction,
  getRecommendMangasAction,
} from "./MangasActions";
// login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userAPI.loginService(datas);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userAPI.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => (dispatch) => {
  userAPI.logoutService();
  dispatch(stopCronJobAction());
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
  dispatch({ type: userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_RESET });
  dispatch({ type: userConstants.USER_VERIFYEMAIL_RESET });
  dispatch({ type: userConstants.USER_RECOVER_PASSWORD_RESET });
  dispatch({ type: userConstants.USER_RESET_PASSWORD_RESET });
  dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
  dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
  dispatch({ type: userConstants.GET_FOLLOW_MANGAS_RESET });
  dispatch({ type: userConstants.GET_ALL_FOLLOW_MANGAS_RESET });
  dispatch({ type: userConstants.GET_COMMENT_MANGAS_RESET });
  dispatch({ type: userConstants.GET_NOTIFICATION_RESET });
  dispatch({ type: userConstants.HIDDEN_NOTIFICATION_RESET });
  dispatch({ type: userConstants.FOLLOW_MANGA_RESET });
  dispatch({ type: userConstants.DELETE_FOLLOW_MANGA_RESET });
  dispatch({ type: userConstants.GET_DATA_READ_RESET });
  dispatch({ type: userConstants.GET_ALL_USERS_RESET });
  dispatch({ type: userConstants.DELETE_USER_RESET });
  dispatch({ type: userConstants.ENABLE_USER_RESET });
  dispatch({ type: userConstants.SET_ADMIN_USER_RESET });
  dispatch({ type: genresConstants.GET_ALL_GENRES_RESET });
  dispatch({ type: genresConstants.CREATE_GENRE_RESET });
  dispatch({ type: genresConstants.UPDATE_GENRE_RESET });
  dispatch({ type: genresConstants.DELETE_GENRE_RESET });
  dispatch({ type: genresConstants.ENABLE_GENRE_RESET });
  dispatch({ type: mangasConstants.MANGAS_HISTORY_RESET });
  dispatch({ type: mangasConstants.ADD_HISTORY_RESET });
  dispatch({ type: mangasConstants.DELETE_HISTORY_RESET });
  dispatch({ type: mangasConstants.MANGA_DETAILS_RESET });
  dispatch({ type: mangasConstants.CHAPTER_DETAILS_RESET });
  dispatch({ type: mangasConstants.RATING_MANGA_RESET });
  dispatch({ type: mangasConstants.GET_RATING_MANGA_RESET });
  dispatch({ type: mangasConstants.MANGA_COMMENTS_RESET });
  dispatch({ type: mangasConstants.CHAPTER_COMMENTS_RESET });
  dispatch({ type: mangasConstants.CREATE_COMMNENT_RESET });
  dispatch({ type: mangasConstants.EMO_COMMNENT_RESET });
  dispatch({ type: mangasConstants.CREATE_FEEDBACK_RESET });
  dispatch({ type: mangasConstants.EMO_FEEDBACK_RESET });
  dispatch({ type: mangasConstants.MANGAS_MANAGER_RESET });
  dispatch({ type: mangasConstants.ALL_MANGA_MANAGER_RESET });
  dispatch({ type: mangasConstants.MANGAS_JOIN_UP_RESET });
  dispatch({ type: mangasConstants.CREATE_MANGA_RESET });
  dispatch({ type: mangasConstants.GET_MANGA_INFO_RESET });
  dispatch({ type: mangasConstants.UPDATE_MANGA_RESET });
  dispatch({ type: mangasConstants.DELETE_MANGAS_RESET });
  dispatch({ type: mangasConstants.ENABLE_MANGA_RESET });
  dispatch({ type: mangasConstants.GET_LIST_USERS_RESET });
  dispatch({ type: mangasConstants.ADD_MEMBERS_RESET });
  dispatch({ type: mangasConstants.TRANSFER_OF_OWNERSHIP_RESET });
  dispatch({ type: mangasConstants.CHAPTERS_MANAGER_RESET });
  dispatch({ type: mangasConstants.CREATE_CHAPTER_RESET });
  dispatch({ type: mangasConstants.GET_CHAPTER_INFO_RESET });
  dispatch({ type: mangasConstants.UPDATE_CHAPTER_RESET });
  dispatch({ type: mangasConstants.ENABLE_CHAPTER_RESET });
  dispatch({ type: mangasConstants.DELETE_CHAPTERS_RESET });
  dispatch(getRecommendMangasAction());
};

const resendEmailVerificationTokenAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_REQUEST });
    const response = await userAPI.resendEmailVerificationTokenService(datas);
    dispatch({
      type: userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_SUCCESS,
      payload: response,
    });
    toast.success("Check your mail");
  } catch (error) {
    const errorMessage = error.response.data.error;
    ErrorsAction(
      error,
      dispatch,
      userConstants.USER_RESENDEMAILVERIFICATIONTOKEN_FAIL,
      errorMessage
    );
  }
};

// Verify Email action
const verifyEmailAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_VERIFYEMAIL_REQUEST });
    const response = await userAPI.verifyEmailService(datas);
    dispatch({
      type: userConstants.USER_VERIFYEMAIL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const errorMessage = error.response.data.error;
    ErrorsAction(
      error,
      dispatch,
      userConstants.USER_VERIFYEMAIL_FAIL,
      errorMessage
    );
  }
};

// Recover Password action
const recoverPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_RECOVER_PASSWORD_REQUEST });
    const response = await userAPI.recoverPasswordService(email);
    dispatch({
      type: userConstants.USER_RECOVER_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_RECOVER_PASSWORD_FAIL);
  }
};

// reset password action
const resetPasswordAction = (token, id, passwords) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_RESET_PASSWORD_REQUEST });
    const response = await userAPI.resetPasswordService(token, id, passwords);
    dispatch({
      type: userConstants.USER_RESET_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_RESET_PASSWORD_FAIL);
  }
};

// get user info action
export const getUserInfoAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_INFO_REQUEST });
    const response = await userAPI.getUserInfoService(id);
    dispatch({
      type: userConstants.USER_INFO_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_INFO_FAIL);
  }
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userAPI.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Personal profile updated");
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userAPI.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
    toast.success("Password has been changed");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

// get follow mangas action
const getFollowMangasAction = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FOLLOW_MANGAS_REQUEST });
    const response = await userAPI.getFollowMangas(
      tokenProtection(getState),
      page
    );
    dispatch({
      type: userConstants.GET_FOLLOW_MANGAS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FOLLOW_MANGAS_FAIL);
  }
};

// get all follow mangas action
const getAllFollowMangasAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_FOLLOW_MANGAS_REQUEST });
    const response = await userAPI.getAllFollowMangas(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_FOLLOW_MANGAS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_FOLLOW_MANGAS_FAIL);
  }
};

// get all comment mangas action
const getCommentMangasAction = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_COMMENT_MANGAS_REQUEST });
    const response = await userAPI.getCommentMangas(
      tokenProtection(getState),
      page
    );
    dispatch({
      type: userConstants.GET_COMMENT_MANGAS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_COMMENT_MANGAS_FAIL);
  }
};

// get all notification action
const getNotificationAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_NOTIFICATION_REQUEST });
    const response = await userAPI.getNotification(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_NOTIFICATION_FAIL);
  }
};

// hidden notification action
const hiddenNotificationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.HIDDEN_NOTIFICATION_REQUEST });
    const response = await userAPI.hiddenNotification(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: userConstants.HIDDEN_NOTIFICATION_SUCCESS,
      payload: response,
    });
    dispatch(getNotificationAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.HIDDEN_NOTIFICATION_FAIL);
  }
};

// get all data read action
const getDataReadAction = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_DATA_READ_REQUEST });
    const response = await userAPI.getDataReadService(
      name,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_DATA_READ_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_DATA_READ_FAIL);
  }
};

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userAPI.getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    await userAPI.deleteUsersService(id, tokenProtection(getState));
    dispatch({ type: userConstants.DELETE_USER_SUCCESS });
    toast.success("This user account has been deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

// admin enable user action
const enableUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.ENABLE_USER_REQUEST });
    await userAPI.enalbeUsersService(id, tokenProtection(getState));
    dispatch({ type: userConstants.ENABLE_USER_SUCCESS });
    toast.success("Tài khoản này đã được cập nhật");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.ENABLE_USER_FAIL);
  }
};

// admin enable user action
const setAdminUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.SET_ADMIN_USER_REQUEST });
    await userAPI.setAdminUsersService(id, tokenProtection(getState));
    dispatch({ type: userConstants.SET_ADMIN_USER_SUCCESS });
    toast.success("Tài khoản này đã trờ thành 1 admin");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.SET_ADMIN_USER_FAIL);
  }
};

// user follow manga action
const followMangaAction =
  ({ mangaId, manganame, chapid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.FOLLOW_MANGA_REQUEST });
      const response = await userAPI.followMangaService(
        mangaId,
        tokenProtection(getState)
      );
      dispatch({ type: userConstants.FOLLOW_MANGA_SUCCESS, payload: response });
      toast.success("Added to your follow");
      dispatch(getAllFollowMangasAction());
      if (chapid === undefined)
        dispatch(getMangaByNameAction(manganame, false));
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.FOLLOW_MANGA_FAIL);
    }
  };

// delete follow manga action
const deleteFollowMangaAction =
  ({ mangaId, manganame, chapid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.DELETE_FOLLOW_MANGA_REQUEST });
      await userAPI.deleteFollowMangaService(
        mangaId,
        tokenProtection(getState)
      );
      dispatch({ type: userConstants.DELETE_FOLLOW_MANGA_SUCCESS });
      toast.success("Follow has been deleted");
      dispatch(getAllFollowMangasAction());
      if (chapid === undefined)
        dispatch(getMangaByNameAction(manganame, false));
      dispatch(getFollowMangasAction());
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.DELETE_FOLLOW_MANGA_FAIL);
    }
  };

// send request action
const sendRequestAction = (request) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.SEND_REQUEST_REQUEST });
    await userAPI.sendRequestService(request, tokenProtection(getState));
    dispatch({ type: userConstants.SEND_REQUEST_SUCCESS });
    toast.success("Đã gửi yêu cầu thành công");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.SEND_REQUEST_FAIL);
  }
};

// auto time read action
const autoTimeReadAction =
  (manganame, chapname, chapid) => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.AUTO_TIME_READ_REQUEST });
      await userAPI.autoTimeReadService(
        manganame,
        chapname,
        chapid,
        tokenProtection(getState)
      );
      dispatch({ type: userConstants.AUTO_TIME_READ_SUCCESS });
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.AUTO_TIME_READ_FAIL);
    }
  };

// stop corn job action
const stopCronJobAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.STOP_CORN_JOB_REQUEST });
    await userAPI.stopCronJobService(tokenProtection(getState));
    dispatch({ type: userConstants.STOP_CORN_JOB_SUCCESS });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.STOP_CORN_JOB_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  resendEmailVerificationTokenAction,
  verifyEmailAction,
  recoverPasswordAction,
  resetPasswordAction,
  updateProfileAction,
  changePasswordAction,
  getFollowMangasAction,
  getAllFollowMangasAction,
  getCommentMangasAction,
  getNotificationAction,
  hiddenNotificationAction,
  getDataReadAction,
  getAllUsersAction,
  deleteUserAction,
  enableUserAction,
  setAdminUserAction,
  followMangaAction,
  deleteFollowMangaAction,
  sendRequestAction,
  autoTimeReadAction,
  stopCronJobAction,
};
