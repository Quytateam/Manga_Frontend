import * as GenresConstants from "../Constants/GenresConstants";

// GET ALL GENRES
export const getAllGenresReducer = (state = { genres: [] }, action) => {
  switch (action.type) {
    case GenresConstants.GET_ALL_GENRES_REQUEST:
      return { isLoading: true };
    case GenresConstants.GET_ALL_GENRES_SUCCESS:
      return { isLoading: false, genres: action.payload };
    case GenresConstants.GET_ALL_GENRES_FAIL:
      return { isLoading: false, isError: action.payload };
    case GenresConstants.GET_ALL_GENRES_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// GET NO EXTEND GENRES
export const getNoExtendGenresReducer = (
  state = { noExtendGenres: [] },
  action
) => {
  switch (action.type) {
    case GenresConstants.GET_NO_EXTEND_GENRES_REQUEST:
      return { isLoading: true };
    case GenresConstants.GET_NO_EXTEND_GENRES_SUCCESS:
      return { isLoading: false, noExtendGenres: action.payload };
    case GenresConstants.GET_NO_EXTEND_GENRES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET ALL GENRES
export const getExtendGenresReducer = (
  state = { extendGenres: [] },
  action
) => {
  switch (action.type) {
    case GenresConstants.GET_EXTEND_GENRES_REQUEST:
      return { isLoading: true };
    case GenresConstants.GET_EXTEND_GENRES_SUCCESS:
      return { isLoading: false, extendGenres: action.payload };
    case GenresConstants.GET_EXTEND_GENRES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE GENRE
export const createGenreReducer = (state = {}, action) => {
  switch (action.type) {
    case GenresConstants.CREATE_GENRE_REQUEST:
      return { isLoading: true };
    case GenresConstants.CREATE_GENRE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case GenresConstants.CREATE_GENRE_FAIL:
      return { isLoading: false, isError: action.payload };
    case GenresConstants.CREATE_GENRE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE GENRE
export const updateGenreReducer = (state = {}, action) => {
  switch (action.type) {
    case GenresConstants.UPDATE_GENRE_REQUEST:
      return { isLoading: true };
    case GenresConstants.UPDATE_GENRE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case GenresConstants.UPDATE_GENRE_FAIL:
      return { isLoading: false, isError: action.payload };
    case GenresConstants.UPDATE_GENRE_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE GENRE
export const deleteGenreReducer = (state = {}, action) => {
  switch (action.type) {
    case GenresConstants.DELETE_GENRE_REQUEST:
      return { isLoading: true };
    case GenresConstants.DELETE_GENRE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case GenresConstants.DELETE_GENRE_FAIL:
      return { isLoading: false, isError: action.payload };
    case GenresConstants.DELETE_GENRE_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN ENABLE GENRE
export const enableGenreReducer = (state = {}, action) => {
  switch (action.type) {
    case GenresConstants.ENABLE_GENRE_REQUEST:
      return { isLoading: true };
    case GenresConstants.ENABLE_GENRE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case GenresConstants.ENABLE_GENRE_FAIL:
      return { isLoading: false, isError: action.payload };
    case GenresConstants.ENABLE_GENRE_RESET:
      return {};
    default:
      return state;
  }
};
