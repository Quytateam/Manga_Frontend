import * as managasConstants from "../Constants/MangasConstants";

// GET NEW UPDATE RECOMMEND
export const mangasRecommendReducer = (
  state = { mangasRecommend: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.MANGAS_RECOMMEND_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_RECOMMEND_SUCCESS:
      return {
        isLoading: false,
        mangasRecommend: action.payload,
      };
    case managasConstants.MANGAS_RECOMMEND_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET NEW UPDATE MANGAS
export const mangasHotReducer = (state = { mangasHot: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_HOT_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_HOT_SUCCESS:
      return {
        isLoading: false,
        mangasHot: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_HOT_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET NEW WEEK MANGAS
export const mangasNewWeekReducer = (state = { mangasNewWeek: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_NEW_WEEK_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_NEW_WEEK_SUCCESS:
      return {
        isLoading: false,
        mangasNewWeek: action.payload,
      };
    case managasConstants.MANGAS_NEW_WEEK_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET NEW UPDATE MANGAS
export const mangasNewUpdateReducer = (
  state = { mangasNewUpdate: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.MANGAS_NEW_UPDATE_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_NEW_UPDATE_SUCCESS:
      return {
        isLoading: false,
        mangasNewUpdate: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_NEW_UPDATE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET GENRE MANGAS
export const mangasGenreReducer = (state = { mangasGenre: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_GENRE_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_GENRE_SUCCESS:
      return {
        isLoading: false,
        mangasGenre: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_GENRE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET ASREACH MANGAS
export const mangasASearchReducer = (state = { mangasASearch: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_ASEARCH_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_ASEARCH_SUCCESS:
      return {
        isLoading: false,
        mangasASearch: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_ASEARCH_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET KEYWORD MANGAS
export const mangasKeywordReducer = (state = { mangasKeyword: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_KEYWORD_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_KEYWORD_SUCCESS:
      return {
        isLoading: false,
        mangasKeyword: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_KEYWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET GENDER MANGAS
export const mangasGenderReducer = (state = { mangasGender: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_GENDER_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_GENDER_SUCCESS:
      return {
        isLoading: false,
        mangasGender: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_GENDER_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET TOP MONTH MANGAS
export const mangasTopMonthReducer = (
  state = { mangasTopMonth: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.MANGAS_TOP_MONTH_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_TOP_MONTH_SUCCESS:
      return {
        isLoading: false,
        mangasTopMonth: action.payload,
      };
    case managasConstants.MANGAS_TOP_MONTH_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET HISTORY MANGAS
export const mangasHistoryReducer = (state = { mangasHistory: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGAS_HISTORY_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_HISTORY_SUCCESS:
      return {
        isLoading: false,
        mangasHistory: action.payload.manga,
        pages: action.payload.pages,
        page: action.payload.pageNumber,
        totalMangas: action.payload.total,
      };
    case managasConstants.MANGAS_HISTORY_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// ADD HISTORY
export const addHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.ADD_HISTORY_REQUEST:
      return { isLoading: true };
    case managasConstants.ADD_HISTORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.ADD_HISTORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.ADD_HISTORY_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE HISTORY
export const deleteHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.DELETE_HISTORY_REQUEST:
      return { isLoading: true };
    case managasConstants.DELETE_HISTORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.DELETE_HISTORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.DELETE_HISTORY_RESET:
      return {};
    default:
      return state;
  }
};

// GET MANGA BY NAME
export const mangaDetailsReducer = (
  state = { manga: {}, firstChapter: {}, lastChapter: {} },
  action
) => {
  switch (action.type) {
    case managasConstants.MANGA_DETAILS_REQUEST:
      return { isLoading: action.isLoading };
    case managasConstants.MANGA_DETAILS_SUCCESS:
      return {
        isLoading: false,
        manga: action.payload.manga,
        firstChapter: action.payload.firstChapter,
        lastChapter: action.payload.lastChapter,
      };
    case managasConstants.MANGA_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.MANGA_DETAILS_RESET:
      return { manga: {} };
    default:
      return state;
  }
};

// GET CHAPTER BY ID
export const chapterDetailsReducer = (
  state = { manga: {}, prevChapter: {}, nextChapter: {}, chapter: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.CHAPTER_DETAILS_REQUEST:
      return { isLoading: true };
    case managasConstants.CHAPTER_DETAILS_SUCCESS:
      return {
        isLoading: false,
        manga: action.payload.manga,
        prevChapter: action.payload.prevChapter,
        nextChapter: action.payload.nextChapter,
        chapter: action.payload.chapter,
      };
    case managasConstants.CHAPTER_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.CHAPTER_DETAILS_RESET:
      return { chapter: {} };
    default:
      return state;
  }
};

// RATING MANGA
export const mangaRatingReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.RATING_MANGA_REQUEST:
      return { isLoading: true };
    case managasConstants.RATING_MANGA_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.RATING_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.RATING_MANGA_RESET:
      return {};
    default:
      return state;
  }
};

// GET RATING MANGA BY NAME
export const getMangaRatingReducer = (state = { rate: [] }, action) => {
  switch (action.type) {
    case managasConstants.GET_RATING_MANGA_REQUEST:
      return { isLoading: true };
    case managasConstants.GET_RATING_MANGA_SUCCESS:
      return {
        isLoading: false,
        rate: action.payload.rate,
      };
    case managasConstants.GET_RATING_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.GET_RATING_MANGA_RESET:
      return { rate: [] };
    default:
      return state;
  }
};

// GET COMMENTS MANGAS
export const mangaCommentsReducer = (state = { mangaComments: [] }, action) => {
  switch (action.type) {
    case managasConstants.MANGA_COMMENTS_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGA_COMMENTS_SUCCESS:
      return {
        isLoading: false,
        mangaComments: action.payload.comment,
        totalComments: action.payload.total,
      };
    case managasConstants.MANGA_COMMENTS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET COMMENTS CHAPTER
export const chapterCommentsReducer = (
  state = { chapterComments: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.CHAPTER_COMMENTS_REQUEST:
      return { isLoading: true };
    case managasConstants.CHAPTER_COMMENTS_SUCCESS:
      return {
        isLoading: false,
        chapterComments: action.payload.comment,
        totalComments: action.payload.total,
      };
    case managasConstants.CHAPTER_COMMENTS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE COMMENT
export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.CREATE_COMMNENT_REQUEST:
      return { isLoading: true };
    case managasConstants.CREATE_COMMNENT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.CREATE_COMMNENT_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.CREATE_COMMNENT_RESET:
      return {};
    default:
      return state;
  }
};

// EMO COMMENT
export const emoCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.EMO_COMMNENT_REQUEST:
      return { isLoading: true };
    case managasConstants.EMO_COMMNENT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.EMO_COMMNENT_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.EMO_COMMNENT_RESET:
      return {};
    default:
      return state;
  }
};

// CREATE FEEDBACK
export const createFeedBackReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.CREATE_FEEDBACK_REQUEST:
      return { isLoading: true };
    case managasConstants.CREATE_FEEDBACK_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.CREATE_FEEDBACK_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.CREATE_FEEDBACK_RESET:
      return {};
    default:
      return state;
  }
};

// EMO FEEDBACK
export const emoFeedBackReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.EMO_FEEDBACK_REQUEST:
      return { isLoading: true };
    case managasConstants.EMO_FEEDBACK_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.EMO_FEEDBACK_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.EMO_FEEDBACK_RESET:
      return {};
    default:
      return state;
  }
};

// GET ALL MANGA MANAGER
export const getAllMangaManagerReducer = (
  state = { allMangaManager: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.ALL_MANGA_MANAGER_REQUEST:
      return { isLoading: true };
    case managasConstants.ALL_MANGA_MANAGER_SUCCESS:
      return {
        isLoading: false,
        allMangaManager: action.payload,
      };
    case managasConstants.ALL_MANGA_MANAGER_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.ALL_MANGA_MANAGER_RESET:
      return {};
    default:
      return state;
  }
};

// GET MANGAS MANAGER
export const getMangasManagerReducer = (
  state = { mangasManager: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.MANGAS_MANAGER_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_MANAGER_SUCCESS:
      return {
        isLoading: false,
        mangasManager: action.payload,
      };
    case managasConstants.MANGAS_MANAGER_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.MANGAS_MANAGER_RESET:
      return {};
    default:
      return state;
  }
};

// GET MANGAS MANAGER
export const getMangasJoinUpReducer = (
  state = { mangasJoinUp: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.MANGAS_JOIN_UP_REQUEST:
      return { isLoading: true };
    case managasConstants.MANGAS_JOIN_UP_SUCCESS:
      return {
        isLoading: false,
        mangasJoinUp: action.payload,
      };
    case managasConstants.MANGAS_JOIN_UP_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.MANGAS_JOIN_UP_RESET:
      return {};
    default:
      return state;
  }
};

// CREATE MANGA
export const createMangaReducer = (state = { manga: {} }, action) => {
  switch (action.type) {
    case managasConstants.CREATE_MANGA_REQUEST:
      return { isLoading: true };
    case managasConstants.CREATE_MANGA_SUCCESS:
      return { isLoading: false, isSuccess: true, manga: action.payload };
    case managasConstants.CREATE_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.CREATE_MANGA_RESET:
      return {};
    default:
      return state;
  }
};

// GET MANGA INFO
export const getMangaInfoReducer = (state = { mangaInfo: {} }, action) => {
  switch (action.type) {
    case managasConstants.GET_MANGA_INFO_REQUEST:
      return { isLoading: action.isLoading };
    case managasConstants.GET_MANGA_INFO_SUCCESS:
      return {
        isLoading: false,
        mangaInfo: action.payload,
      };
    case managasConstants.GET_MANGA_INFO_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.GET_MANGA_INFO_RESET:
      return { mangaInfo: {} };
    default:
      return state;
  }
};

// UPDATE MANGA
export const updateMangaReducer = (state = { manga: {} }, action) => {
  switch (action.type) {
    case managasConstants.UPDATE_MANGA_REQUEST:
      return { isLoading: true };
    case managasConstants.UPDATE_MANGA_SUCCESS:
      return { isLoading: false, isSuccess: true, manga: action.payload };
    case managasConstants.UPDATE_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.UPDATE_MANGA_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE MANGAS
export const deleteMangasReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.DELETE_MANGAS_REQUEST:
      return { isLoading: true };
    case managasConstants.DELETE_MANGAS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.DELETE_MANGAS_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.DELETE_MANGAS_RESET:
      return {};
    default:
      return state;
  }
};

// ENABLE MANGA
export const enableMangaReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.ENABLE_MANGA_REQUEST:
      return { isLoading: true };
    case managasConstants.ENABLE_MANGA_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.ENABLE_MANGA_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.ENABLE_MANGA_RESET:
      return {};
    default:
      return state;
  }
};

// GET LIST USERS
export const getListUsersReducer = (state = { listUsers: [] }, action) => {
  switch (action.type) {
    case managasConstants.GET_LIST_USERS_REQUEST:
      return { isLoading: true };
    case managasConstants.GET_LIST_USERS_SUCCESS:
      return { isLoading: false, listUsers: action.payload };
    case managasConstants.GET_LIST_USERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.GET_LIST_USERS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// ADD MEMBER JOIN UP
export const addMembersReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.ADD_MEMBERS_REQUEST:
      return { isLoading: true };
    case managasConstants.ADD_MEMBERS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.ADD_MEMBERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.ADD_MEMBERS_RESET:
      return {};
    default:
      return state;
  }
};

// TRANSFER OF OWNERSHIP
export const transferOfOwnershipReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.TRANSFER_OF_OWNERSHIP_REQUEST:
      return { isLoading: true };
    case managasConstants.TRANSFER_OF_OWNERSHIP_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.TRANSFER_OF_OWNERSHIP_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.TRANSFER_OF_OWNERSHIP_RESET:
      return {};
    default:
      return state;
  }
};

// GET CHAPTER MANAGER
export const getChaptersManagerReducer = (
  state = { chaptersManager: [] },
  action
) => {
  switch (action.type) {
    case managasConstants.CHAPTERS_MANAGER_REQUEST:
      return { isLoading: true };
    case managasConstants.CHAPTERS_MANAGER_SUCCESS:
      return {
        isLoading: false,
        chaptersManager: action.payload.chapters,
        mangaName: action.payload.mangaName,
      };
    case managasConstants.CHAPTERS_MANAGER_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.CHAPTERS_MANAGER_RESET:
      return {};
    default:
      return state;
  }
};

// GET MANGA BY NAME
export const getChapterInfoReducer = (state = { chapterInfo: {} }, action) => {
  switch (action.type) {
    case managasConstants.GET_CHAPTER_INFO_REQUEST:
      return { isLoading: action.isLoading };
    case managasConstants.GET_CHAPTER_INFO_SUCCESS:
      return {
        isLoading: false,
        chapterInfo: action.payload,
      };
    case managasConstants.GET_CHAPTER_INFO_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.GET_CHAPTER_INFO_RESET:
      return { chapterInfo: {} };
    default:
      return state;
  }
};

// CREATE CHAPTER
export const createChapterReducer = (state = { chapter: {} }, action) => {
  switch (action.type) {
    case managasConstants.CREATE_CHAPTER_REQUEST:
      return { isLoading: true };
    case managasConstants.CREATE_CHAPTER_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        chapter: action.payload !== undefined && action.payload,
      };
    case managasConstants.CREATE_CHAPTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.CREATE_CHAPTER_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE CHAPTER
export const updateChapterReducer = (state = { mangaid: {} }, action) => {
  switch (action.type) {
    case managasConstants.UPDATE_CHAPTER_REQUEST:
      return { isLoading: true };
    case managasConstants.UPDATE_CHAPTER_SUCCESS:
      return { isLoading: false, isSuccess: true, mangaid: action.payload };
    case managasConstants.UPDATE_CHAPTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.UPDATE_CHAPTER_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE CHAPTERS
export const deleteChaptersReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.DELETE_CHAPTERS_REQUEST:
      return { isLoading: true };
    case managasConstants.DELETE_CHAPTERS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.DELETE_CHAPTERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.DELETE_CHAPTERS_RESET:
      return {};
    default:
      return state;
  }
};

// ENABLE CHAPTER
export const enableChapterReducer = (state = {}, action) => {
  switch (action.type) {
    case managasConstants.ENABLE_CHAPTER_REQUEST:
      return { isLoading: true };
    case managasConstants.ENABLE_CHAPTER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case managasConstants.ENABLE_CHAPTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case managasConstants.ENABLE_CHAPTER_RESET:
      return {};
    default:
      return state;
  }
};
