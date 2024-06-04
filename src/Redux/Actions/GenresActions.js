import * as GenresConstants from "../Constants/GenresConstants";
import * as genresAPIs from "../APIs/GneresServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// Get all Genres action
export const getAllGenresAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GenresConstants.GET_ALL_GENRES_REQUEST });
    const data = await genresAPIs.getGenresService(tokenProtection(getState));
    dispatch({
      type: GenresConstants.GET_ALL_GENRES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.GET_ALL_GENRES_FAIL);
  }
};

// Get No Extend Genres action
export const getNoExtendGenresAction = () => async (dispatch) => {
  try {
    dispatch({ type: GenresConstants.GET_NO_EXTEND_GENRES_REQUEST });
    const data = await genresAPIs.getNoExtendGenresService();
    dispatch({
      type: GenresConstants.GET_NO_EXTEND_GENRES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.GET_NO_EXTEND_GENRES_FAIL);
  }
};

// Get Extend Genres action
export const getExtendGenresAction = () => async (dispatch) => {
  try {
    dispatch({ type: GenresConstants.GET_EXTEND_GENRES_REQUEST });
    const data = await genresAPIs.getExtendGenresService();
    dispatch({
      type: GenresConstants.GET_EXTEND_GENRES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.GET_EXTEND_GENRES_FAIL);
  }
};

// Create Genre action
export const createGenreAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: GenresConstants.CREATE_GENRE_REQUEST });
    await genresAPIs.createGenreService(title, tokenProtection(getState));
    dispatch({ type: GenresConstants.CREATE_GENRE_SUCCESS });
    toast.success("The new genre was successfully created");
    dispatch(getAllGenresAction());
    dispatch(getNoExtendGenresAction());
    dispatch(getExtendGenresAction());
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.CREATE_GENRE_FAIL);
  }
};

// Update Genre action
export const updateGenreAction = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({ type: GenresConstants.UPDATE_GENRE_REQUEST });
    await genresAPIs.updateGenreService(id, title, tokenProtection(getState));
    dispatch({ type: GenresConstants.UPDATE_GENRE_SUCCESS });
    toast.success("This genre was successfully updated");
    dispatch(getAllGenresAction());
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.UPDATE_GENRE_FAIL);
  }
};

// Delete Genre action
export const deleteGenreAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GenresConstants.DELETE_GENRE_REQUEST });
    await genresAPIs.deleteGenreService(id, tokenProtection(getState));
    dispatch({ type: GenresConstants.DELETE_GENRE_SUCCESS });
    toast.success("Thể loại này đã được xóa thành công");
    dispatch(getAllGenresAction());
    dispatch(getNoExtendGenresAction());
    dispatch(getExtendGenresAction());
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.DELETE_GENRE_FAIL);
  }
};

// Enable Genre action
export const enableGenreAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GenresConstants.ENABLE_GENRE_REQUEST });
    await genresAPIs.enalbeGenreService(id, tokenProtection(getState));
    dispatch({ type: GenresConstants.ENABLE_GENRE_SUCCESS });
    toast.success("Thể loại này đã được cập nhật");
    dispatch(getAllGenresAction());
    dispatch(getNoExtendGenresAction());
    dispatch(getExtendGenresAction());
  } catch (error) {
    ErrorsAction(error, dispatch, GenresConstants.ENABLE_GENRE_FAIL);
  }
};
