import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as genres from "./Reducers/GenresReducers";
import * as mangas from "./Reducers/MangasReducers";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userGoogleLogin: User.userGoogleLoginReducer,
  userRegister: User.userRegisterReducer,
  userResendEmailVerificationToken:
    User.userResendEmailVerificationTokenReducer,
  userVerifyEmail: User.userVerifyEmailReducer,
  userRecoverPassword: User.userRecoverPasswordReducer,
  userResetPassword: User.userResetPasswordReducer,
  getUserInfo: User.userInfoReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  //   userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userCreatePassword: User.userCreatePasswordReducer,
  userGetFollowMangas: User.userGetFollowMangasReducer,
  userGetAllFollowMangas: User.userGetAllFollowMangasReducer,
  userFollowManga: User.userFollowMangaReducer,
  userDeleteFollowManga: User.userDeleteFollowMangaReducer,
  userGetCommentMangas: User.userGetCommentMangasReducer,
  userGetNotification: User.userGetNotificationReducer,
  userHiddenNotification: User.userHiddenNotificationReducer,
  userGetDataRead: User.userGetDataReadReducer,
  userSendRequest: User.userSendRequestReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  adminEnableUser: User.adminEnableUserReducer,
  adminSetAdminUser: User.adminSetAdminUserReducer,
  autoTimeRead: User.userAutoTimeReadReducer,
  stopCronJob: User.userStopCronJobReducer,
  // Genre reducers
  genreGetAll: genres.getAllGenresReducer,
  genreGetNoExtend: genres.getNoExtendGenresReducer,
  genreGetExtend: genres.getExtendGenresReducer,
  genreCreate: genres.createGenreReducer,
  genreUpdate: genres.updateGenreReducer,
  genreDelete: genres.deleteGenreReducer,
  genreEnable: genres.enableGenreReducer,
  // Mangas reducers
  getMangasRecommend: mangas.mangasRecommendReducer,
  getMangasHot: mangas.mangasHotReducer,
  getMangasNewWeek: mangas.mangasNewWeekReducer,
  getMangasNewUpdate: mangas.mangasNewUpdateReducer,
  getMangasByGenre: mangas.mangasGenreReducer,
  getMangasByASearch: mangas.mangasASearchReducer,
  getMangasByKeyword: mangas.mangasKeywordReducer,
  getMangasByGender: mangas.mangasGenderReducer,
  getMangasTopMonth: mangas.mangasTopMonthReducer,
  getMangasHistory: mangas.mangasHistoryReducer,
  addHistory: mangas.addHistoryReducer,
  deleteHistory: mangas.deleteHistoryReducer,
  getMangaByName: mangas.mangaDetailsReducer,
  getChapterById: mangas.chapterDetailsReducer,
  mangaRatingManga: mangas.mangaRatingReducer,
  getMangaRatingManga: mangas.getMangaRatingReducer,
  getMangaComments: mangas.mangaCommentsReducer,
  getChapterComments: mangas.chapterCommentsReducer,
  createComment: mangas.createCommentReducer,
  emoComment: mangas.emoCommentReducer,
  createFeedBack: mangas.createFeedBackReducer,
  emoFeedBack: mangas.emoFeedBackReducer,
  getAllMangaManager: mangas.getAllMangaManagerReducer,
  getMangasManager: mangas.getMangasManagerReducer,
  getMangasJoinUp: mangas.getMangasJoinUpReducer,
  createManga: mangas.createMangaReducer,
  updateManga: mangas.updateMangaReducer,
  deleteMangas: mangas.deleteMangasReducer,
  enableManga: mangas.enableMangaReducer,
  getListUsers: mangas.getListUsersReducer,
  addMembers: mangas.addMembersReducer,
  transferOfOwnership: mangas.transferOfOwnershipReducer,
  getMangaInfo: mangas.getMangaInfoReducer,
  getChaptersManager: mangas.getChaptersManagerReducer,
  getChapterInfo: mangas.getChapterInfoReducer,
  createChapter: mangas.createChapterReducer,
  updateChapter: mangas.updateChapterReducer,
  deleteChapters: mangas.deleteChaptersReducer,
  enableChapter: mangas.enableChapterReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
