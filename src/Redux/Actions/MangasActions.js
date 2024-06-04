import * as mangasConstants from "../Constants/MangasConstants";
import * as mangasAPIs from "../APIs/MangasServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// get hot mangas action
export const getHotMangasAction =
  (page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGAS_HOT_REQUEST });
      const response = await mangasAPIs.getHotMangasService(page);
      dispatch({
        type: mangasConstants.MANGAS_HOT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGAS_HOT_FAIL);
    }
  };

// get new week mangas action
export const getNewWeekMangasAction = () => async (dispatch) => {
  try {
    dispatch({ type: mangasConstants.MANGAS_NEW_WEEK_REQUEST });
    const response = await mangasAPIs.getNewWeekMangasService();
    dispatch({
      type: mangasConstants.MANGAS_NEW_WEEK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGAS_NEW_WEEK_FAIL);
  }
};

// get new update mangas action
export const getNewUpdateMangasAction =
  (page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGAS_NEW_UPDATE_REQUEST });
      const response = await mangasAPIs.getNewUpdateMangasService(page);
      dispatch({
        type: mangasConstants.MANGAS_NEW_UPDATE_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGAS_NEW_UPDATE_FAIL);
    }
  };

// get genre mangas action
export const getGenreMangasAction =
  ({ genre = "", status = "", sort = "", page = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGAS_GENRE_REQUEST });
      const response = await mangasAPIs.getGenreMangasService(
        genre,
        status,
        sort,
        page
      );
      dispatch({
        type: mangasConstants.MANGAS_GENRE_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGAS_GENRE_FAIL);
    }
  };

// get asreach mangas action
export const getASearchMangasAction =
  ({
    genres = "",
    notgenres = "",
    gender = "-1",
    status = "-1",
    minchapter = "1",
    sort = "0",
    page = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGAS_ASEARCH_REQUEST });
      const response = await mangasAPIs.getASearchMangasService(
        genres,
        notgenres,
        gender,
        status,
        minchapter,
        sort,
        page
      );
      dispatch({
        type: mangasConstants.MANGAS_ASEARCH_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGAS_ASEARCH_FAIL);
    }
  };

// get keyword mangas action
export const getKeywordMangasAction =
  ({ keyword = "", page = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGAS_KEYWORD_REQUEST });
      const response = await mangasAPIs.getKeywordMangasService(keyword, page);
      dispatch({
        type: mangasConstants.MANGAS_KEYWORD_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGAS_KEYWORD_FAIL);
    }
  };

// get gender mangas action
export const getGenderMangasAction =
  ({ gender, page = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGAS_GENDER_REQUEST });
      const response = await mangasAPIs.getGenderMangasService(gender, page);
      dispatch({
        type: mangasConstants.MANGAS_GENDER_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGAS_GENDER_FAIL);
    }
  };

// get top month mangas action
export const getTopMonthMangasAction = () => async (dispatch) => {
  try {
    dispatch({ type: mangasConstants.MANGAS_TOP_MONTH_REQUEST });
    const response = await mangasAPIs.getTopMonthMangasService();
    dispatch({
      type: mangasConstants.MANGAS_TOP_MONTH_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGAS_TOP_MONTH_FAIL);
  }
};

// get recommend mangas action
export const getRecommendMangasAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.MANGAS_RECOMMEND_REQUEST });
    const response = await mangasAPIs.getRecommendMangasService(
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.MANGAS_RECOMMEND_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGAS_RECOMMEND_FAIL);
  }
};

// get history mangas action
export const getHistoryMangasAction = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.MANGAS_HISTORY_REQUEST });
    const response = await mangasAPIs.getHistoryMangasService(
      tokenProtection(getState),
      page
    );
    dispatch({
      type: mangasConstants.MANGAS_HISTORY_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGAS_HISTORY_FAIL);
  }
};

// add history action
export const addHistoryAction =
  (manganame, chapname, chapid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: mangasConstants.ADD_HISTORY_REQUEST,
      });
      const response = await mangasAPIs.addHistoryService(
        manganame,
        chapname,
        chapid,
        tokenProtection(getState)
      );
      dispatch({
        type: mangasConstants.ADD_HISTORY_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.ADD_HISTORY_FAIL);
    }
  };

// delete history action
export const deleteHistoryAction = (id, page) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.DELETE_HISTORY_REQUEST });
    await mangasAPIs.deleteHistoryService(id, tokenProtection(getState));
    dispatch({ type: mangasConstants.DELETE_HISTORY_SUCCESS });
    dispatch(getHistoryMangasAction(page));
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.DELETE_HISTORY_FAIL);
  }
};

// get manga by name action
export const getMangaByNameAction = (name, isLoading) => async (dispatch) => {
  try {
    dispatch({
      type: mangasConstants.MANGA_DETAILS_REQUEST,
      isLoading: isLoading,
    });
    const response = await mangasAPIs.getMangaByNameService(name);
    dispatch({
      type: mangasConstants.MANGA_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGA_DETAILS_FAIL);
  }
};

// get chapter by id action
export const getChapterByIdAction =
  (manganame, chapname, chapid) => async (dispatch) => {
    try {
      dispatch({
        type: mangasConstants.CHAPTER_DETAILS_REQUEST,
      });
      const response = await mangasAPIs.getChapterByIdService(
        manganame,
        chapname,
        chapid
      );
      dispatch({
        type: mangasConstants.CHAPTER_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CHAPTER_DETAILS_FAIL);
    }
  };

// rating manga action
export const ratingMangaAction = (name, rate) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.RATING_MANGA_REQUEST });
    const response = await mangasAPIs.ratingMangaService(
      name,
      rate,
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.RATING_MANGA_SUCCESS,
      payload: response,
    });
    toast.success("You rate manga successfully");
    dispatch(getRatingMangaAction(name));
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.RATING_MANGA_FAIL);
  }
};

// get rating manga action
export const getRatingMangaAction = (name) => async (dispatch) => {
  try {
    dispatch({ type: mangasConstants.GET_RATING_MANGA_REQUEST });
    const response = await mangasAPIs.getRatingMangaService(name);
    dispatch({
      type: mangasConstants.GET_RATING_MANGA_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.GET_RATING_MANGA_FAIL);
  }
};

// get comment manga action
export const getCommentsMangaAction =
  (name, page = "", newlist = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.MANGA_COMMENTS_REQUEST });
      const response = await mangasAPIs.getCommentsMangaService(
        name,
        page,
        newlist
      );
      dispatch({
        type: mangasConstants.MANGA_COMMENTS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.MANGA_COMMENTS_FAIL);
    }
  };

// get comment chapter action
export const getCommentsChapterAction =
  (manganame, chapname, chapid, page = "", newlist = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: mangasConstants.CHAPTER_COMMENTS_REQUEST });
      const response = await mangasAPIs.getCommentsChapterService(
        manganame,
        chapname,
        chapid,
        page,
        newlist
      );
      dispatch({
        type: mangasConstants.CHAPTER_COMMENTS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CHAPTER_COMMENTS_FAIL);
    }
  };

// create comment action
export const createCommentAction =
  ({ comment, manganame, chapname, chapid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.CREATE_COMMNENT_REQUEST });
      const response = await mangasAPIs.creatCommentService(
        tokenProtection(getState),
        comment,
        manganame,
        chapname,
        chapid
      );
      dispatch({
        type: mangasConstants.CREATE_COMMNENT_SUCCESS,
        payload: response,
      });
      toast.success("Đã thêm bình luận thành công");
      dispatch({ type: mangasConstants.CREATE_COMMNENT_RESET });
      if (chapid)
        dispatch(getCommentsChapterAction(manganame, chapname, chapid));
      else dispatch(getCommentsMangaAction(manganame));
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CREATE_COMMNENT_FAIL);
    }
  };

// emo comment action
export const emoCommentAction =
  ({ id, emo, manganame, chapname, chapid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.CREATE_COMMNENT_REQUEST });
      const response = await mangasAPIs.emoCommentService(
        tokenProtection(getState),
        id,
        emo
      );
      dispatch({
        type: mangasConstants.CREATE_COMMNENT_SUCCESS,
        payload: response,
      });
      dispatch({ type: mangasConstants.CREATE_COMMNENT_RESET });
      if (chapid)
        dispatch(getCommentsChapterAction(manganame, chapname, chapid));
      else dispatch(getCommentsMangaAction(manganame));
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CREATE_COMMNENT_FAIL);
    }
  };

// create feedback action
export const createFeedBackAction =
  ({ feedback, commentid, feedbackid, manganame, chapname, chapid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.CREATE_FEEDBACK_REQUEST });
      const response = await mangasAPIs.creatFeedBackService(
        tokenProtection(getState),
        feedback,
        commentid,
        feedbackid
      );
      dispatch({
        type: mangasConstants.CREATE_FEEDBACK_SUCCESS,
        payload: response,
      });
      toast.success("Đã thêm phản hồi thành công");
      dispatch({ type: mangasConstants.CREATE_FEEDBACK_RESET });
      if (chapid)
        dispatch(getCommentsChapterAction(manganame, chapname, chapid));
      else dispatch(getCommentsMangaAction(manganame));
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CREATE_FEEDBACK_FAIL);
    }
  };

// emo feedback action
export const emoFeedBackAction =
  ({ commentid, feedbackid, emo, manganame, chapname, chapid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.EMO_FEEDBACK_REQUEST });
      const response = await mangasAPIs.emoFeedBackService(
        tokenProtection(getState),
        commentid,
        feedbackid,
        emo
      );
      dispatch({
        type: mangasConstants.EMO_FEEDBACK_SUCCESS,
        payload: response,
      });
      dispatch({ type: mangasConstants.EMO_FEEDBACK_RESET });
      if (chapid)
        dispatch(getCommentsChapterAction(manganame, chapname, chapid));
      else dispatch(getCommentsMangaAction(manganame));
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CREATE_FEEDBACK_FAIL);
    }
  };

// get all manga manager action
export const getAllMangaManagerAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.ALL_MANGA_MANAGER_REQUEST });
    const response = await mangasAPIs.getAllMangaManagerService(
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.ALL_MANGA_MANAGER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.ALL_MANGA_MANAGER_FAIL);
  }
};

// get mangas manager action
export const getMangasManagerAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.MANGAS_MANAGER_REQUEST });
    const response = await mangasAPIs.getMangasManagerService(
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.MANGAS_MANAGER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGAS_MANAGER_FAIL);
  }
};

// get mangas join up action
export const getMangasJoinUpAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.MANGAS_JOIN_UP_REQUEST });
    const response = await mangasAPIs.getMangasJoinUpService(
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.MANGAS_JOIN_UP_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.MANGAS_JOIN_UP_FAIL);
  }
};

// create manga action
export const createMangaAction = (manga) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.CREATE_MANGA_REQUEST });
    const response = await mangasAPIs.createMangaService(
      tokenProtection(getState),
      manga
    );
    dispatch({
      type: mangasConstants.CREATE_MANGA_SUCCESS,
      payload: response,
    });
    toast.success("The manga was successfully created");
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.CREATE_MANGA_FAIL);
  }
};

// get manga info action
export const getMangaInfoAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.GET_MANGA_INFO_REQUEST });
    const response = await mangasAPIs.getMangaInfoService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: mangasConstants.GET_MANGA_INFO_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.GET_MANGA_INFO_FAIL);
  }
};

// Update manga action
export const updateMangaAction = (id, manga) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.UPDATE_MANGA_REQUEST });
    const response = await mangasAPIs.updateMangaService(
      tokenProtection(getState),
      id,
      manga
    );
    dispatch({
      type: mangasConstants.UPDATE_MANGA_SUCCESS,
      payload: response,
    });
    dispatch(getMangaInfoAction(id));
    toast.success("Manga updated successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.UPDATE_MANGA_FAIL);
  }
};

// delete mangas action
export const deleteMangasAction =
  (id, isAdmin) => async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.DELETE_MANGAS_REQUEST });
      await mangasAPIs.deleteMangasService(id, tokenProtection(getState));
      dispatch({ type: mangasConstants.DELETE_MANGAS_SUCCESS });
      if (isAdmin) dispatch(getAllMangaManagerAction());
      else dispatch(getMangasManagerAction());
      toast.success("Đã truyện xóa thành công");
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.DELETE_MANGAS_FAIL);
    }
  };

// enable manga action
export const enableMangaAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.ENABLE_MANGA_REQUEST });
    await mangasAPIs.enalbeMangaService(id, tokenProtection(getState));
    dispatch({ type: mangasConstants.ENABLE_MANGA_SUCCESS });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.ENABLE_MANGA_FAIL);
  }
};

// list get list users action
export const getListUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.GET_LIST_USERS_REQUEST });
    const response = await mangasAPIs.getListUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.GET_LIST_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.GET_LIST_USERS_FAIL);
  }
};

// user follow manga action
export const addMembersAction =
  ({ mangaId, userId, isAdmin }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.ADD_MEMBERS_REQUEST });
      const response = await mangasAPIs.addMembersService(
        mangaId,
        userId,
        tokenProtection(getState)
      );
      dispatch({
        type: mangasConstants.ADD_MEMBERS_SUCCESS,
        payload: response,
      });
      toast.success("Thêm thành viên thành công");
      if (isAdmin) dispatch(getAllMangaManagerAction());
      else dispatch(getMangasManagerAction());
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.ADD_MEMBERS_FAIL);
    }
  };

// user follow manga action
export const transferOfOwnershipAction =
  ({ mangaId, userId, isAdmin }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.TRANSFER_OF_OWNERSHIP_REQUEST });
      const response = await mangasAPIs.transferOfOwnershipService(
        mangaId,
        userId,
        tokenProtection(getState)
      );
      dispatch({
        type: mangasConstants.TRANSFER_OF_OWNERSHIP_SUCCESS,
        payload: response,
      });
      toast.success("Chuyển quền thành công");
      if (isAdmin) dispatch(getAllMangaManagerAction());
      else dispatch(getMangasManagerAction());
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.TRANSFER_OF_OWNERSHIP_FAIL);
    }
  };

// get chapters manager action
export const getChaptersManagerAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: mangasConstants.CHAPTERS_MANAGER_REQUEST });
    const response = await mangasAPIs.getChaptersManagerService(
      id,
      tokenProtection(getState)
    );
    dispatch({
      type: mangasConstants.CHAPTERS_MANAGER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, mangasConstants.CHAPTERS_MANAGER_FAIL);
  }
};

// create chapter action
export const createChapterAction =
  (id, chapter) => async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.CREATE_CHAPTER_REQUEST });
      const response = await mangasAPIs.createChapterService(
        tokenProtection(getState),
        id,
        chapter
      );
      dispatch({
        type: mangasConstants.CREATE_CHAPTER_SUCCESS,
        payload: response,
      });
      toast.success("The chapter was successfully created");
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.CREATE_CHAPTER_FAIL);
    }
  };

// get chapter info action
export const getChapterInfoAction =
  (id, mangaId) => async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.GET_CHAPTER_INFO_REQUEST });
      const response = await mangasAPIs.getChapterInfoService(
        tokenProtection(getState),
        id,
        mangaId
      );
      dispatch({
        type: mangasConstants.GET_CHAPTER_INFO_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.GET_CHAPTER_INFO_FAIL);
    }
  };

// delete chapters action
export const deleteChaptersAction =
  (id, chapId) => async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.DELETE_CHAPTERS_REQUEST });
      await mangasAPIs.deleteChaptersService(
        id,
        chapId,
        tokenProtection(getState)
      );
      dispatch({ type: mangasConstants.DELETE_CHAPTERS_SUCCESS });
      dispatch(getChaptersManagerAction(id));
      toast.success("Đã chương truyện xóa thành công");
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.DELETE_CHAPTERS_FAIL);
    }
  };

// enable chapter action
export const enableChapterAction =
  (id, chapId) => async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.ENABLE_CHAPTER_REQUEST });
      await mangasAPIs.enalbeChapterService(
        id,
        chapId,
        tokenProtection(getState)
      );
      dispatch({ type: mangasConstants.ENABLE_CHAPTER_SUCCESS });
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.ENABLE_CHAPTER_FAIL);
    }
  };

// Update chapter action
export const updateChapterAction =
  (id, chapId, chapter) => async (dispatch, getState) => {
    try {
      dispatch({ type: mangasConstants.UPDATE_CHAPTER_REQUEST });
      const response = await mangasAPIs.updateChapterService(
        tokenProtection(getState),
        id,
        chapId,
        chapter
      );
      dispatch({
        type: mangasConstants.UPDATE_CHAPTER_SUCCESS,
        payload: response,
      });
      dispatch(getChapterInfoAction(chapId, id));
      toast.success("Chapter updated successfully");
    } catch (error) {
      ErrorsAction(error, dispatch, mangasConstants.UPDATE_CHAPTER_FAIL);
    }
  };
