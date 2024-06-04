import Axios from "./Axios";

// ***************** PUBLIC APIs ****************
// Get extend genres API function
const getNoExtendGenresService = async () => {
  const { data } = await Axios.get("/genres/noextend");
  return data;
};

// Get extend genres API function
const getExtendGenresService = async () => {
  const { data } = await Axios.get("/genres/extend");
  return data;
};

// ***************** ADMIN APIs ****************

// Get all genres API function
const getGenresService = async (token) => {
  const { data } = await Axios.get("/genres", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create new genre API function
const createGenreService = async (genre, token) => {
  const { data } = await Axios.post("/genres", genre, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete genre API function
const deleteGenreService = async (id, token) => {
  const { data } = await Axios.delete(`/genres/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update genre API function
const updateGenreService = async (id, genre, token) => {
  const { data } = await Axios.put(`/genres/${id}`, genre, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// enable genre API function
const enalbeGenreService = async (id, token) => {
  const { data } = await Axios.patch(`/genres/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getNoExtendGenresService,
  getExtendGenresService,
  getGenresService,
  createGenreService,
  deleteGenreService,
  updateGenreService,
  enalbeGenreService,
};
