import Axios from "./Axios";

// ************ PUBLIC APIs ************
// get hot mangas Function
export const getHotMangasService = async (page) => {
  const { data } = await Axios.get(`/manga/hot?page=${page}`);
  return data;
};

// get new week mangas Function
export const getNewWeekMangasService = async () => {
  const { data } = await Axios.get("/manga/newweek");
  return data;
};

// get new update mangas Function
export const getNewUpdateMangasService = async (page) => {
  const { data } = await Axios.get(`/manga?page=${page}`);
  return data;
};

// get genre mangas Function
export const getGenreMangasService = async (genre, status, sort, page) => {
  const { data } = await Axios.get(
    `/genres/genre/${genre}?status=${status}&sort=${sort}&page=${page}`
  );
  return data;
};

// get asearch mangas Function
export const getASearchMangasService = async (
  genres,
  notgenres,
  gender,
  status,
  minchapter,
  sort,
  page
) => {
  const { data } = await Axios.get(
    `/search/pro?genres=${genres}&notgenres=${notgenres}&gender=${gender}&status=${status}&minchapter=${minchapter}&sort=${sort}&page=${page}`
  );
  return data;
};

// get keyword mangas Function
export const getKeywordMangasService = async (keyword, page) => {
  const { data } = await Axios.get(
    `/search/keyword?keyword=${keyword}&page=${page}`
  );
  return data;
};

// get gender mangas Function
export const getGenderMangasService = async (gender, page) => {
  const { data } = await Axios.get(`/search/gender/${gender}?page=${page}`);
  return data;
};

// get top month mangas Function
export const getTopMonthMangasService = async () => {
  const { data } = await Axios.get("/manga/top-month");
  return data;
};

// get manga by name Function
export const getMangaByNameService = async (name) => {
  const { data } = await Axios.get(`/manga/detail/${name}`);
  return data;
};

// get chapter by id Function
export const getChapterByIdService = async (manganame, chapname, chapid) => {
  const { data } = await Axios.get(
    `/manga/detail/${manganame}/${chapname}/${chapid}`
  );
  return data;
};

// get rating manga Function
export const getRatingMangaService = async (name) => {
  const { data } = await Axios.get(`/manga/rating/${name}`);
  return data;
};

// get comments manga Function
export const getCommentsMangaService = async (name, page, newlist) => {
  const { data } = await Axios.get(
    `/manga/comment/${name}?page=${page}&newlist=${newlist}`
  );
  return data;
};

// get comments chapter Function
export const getCommentsChapterService = async (
  manganame,
  chapname,
  chapid,
  page,
  newlist
) => {
  const { data } = await Axios.get(
    `/manga/comment/${manganame}/${chapname}/${chapid}?page=${page}&newlist=${newlist}`
  );
  return data;
};

// create comment Function
export const creatCommentService = async (
  token,
  comment,
  manganame,
  chapname,
  chapid
) => {
  if (chapid) {
    const { data } = await Axios.post(
      `/manga/comment/${manganame}/${chapname}/${chapid}`,
      {
        commentContent: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } else {
    const { data } = await Axios.post(
      `/manga/comment/${manganame}`,
      {
        commentContent: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};

// emo comment Function
export const emoCommentService = async (token, id, emo) => {
  const { data } = await Axios.put(
    `/manga/emocomment/${id}`,
    {
      emo: emo,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// create feedback Function
export const creatFeedBackService = async (
  token,
  feedback,
  commentid,
  feedbackid
) => {
  if (feedbackid) {
    const { data } = await Axios.post(
      `/manga/feedback/${commentid}/${feedbackid}`,
      {
        feedBackContent: feedback,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } else {
    const { data } = await Axios.post(
      `/manga/feedback/${commentid}`,
      {
        feedBackContent: feedback,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};

// emo feedback Function
export const emoFeedBackService = async (token, commentid, feedbackid, emo) => {
  const { data } = await Axios.put(
    "/manga/emofeedback",
    {
      commentId: commentid,
      feedBackId: feedbackid,
      emo: emo,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// ************ PRIVATE APIs ************
// get recommend mangas Function
export const getRecommendMangasService = async (token) => {
  if (token) {
    const { data } = await Axios.get("/manga/recommend", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } else {
    const { data } = await Axios.get("/manga/viewday");
    return data;
  }
};

// get history mangas Function
export const getHistoryMangasService = async (token, page) => {
  if (token) {
    const { data } = await Axios.get(`/history?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } else {
    const data = {
      manga: [],
      pageNumber: 0,
      pages: 0,
      total: 0,
    };
    return data;
  }
};

// add history API call
export const addHistoryService = async (manganame, chapname, chapid, token) => {
  if (token) {
    const { data } = await Axios.post(
      `/history/${manganame}/${chapname}/${chapid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};

// delete history API call
export const deleteHistoryService = async (id, token) => {
  const { data } = await Axios.delete(`/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// rating manga
export const ratingMangaService = async (name, rate, token) => {
  const { data } = await Axios.post(
    `/manga/rating/${name}`,
    {
      rate: Number(rate),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// get all manga manager Function
export const getAllMangaManagerService = async (token) => {
  const { data } = await Axios.get("/admin/allmanga", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get mangas manager Function
export const getMangasManagerService = async (token) => {
  const { data } = await Axios.get("/admin/managermanga", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get mangas join up Function
export const getMangasJoinUpService = async (token) => {
  const { data } = await Axios.get("/admin/joinup", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create manga Function
export const createMangaService = async (token, manga) => {
  const { data } = await Axios.post("/admin/manga/create", manga, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get manga info Function
export const getMangaInfoService = async (token, id) => {
  const { data } = await Axios.get(`/admin/mangainfo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update manga Function
export const updateMangaService = async (token, id, manga) => {
  const { data } = await Axios.put(`/admin/manga/${id}`, manga, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete mangas
export const deleteMangasService = async (id, token) => {
  const { data } = await Axios.delete("/admin/managermanga", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      mangaId: id,
    },
  });
  return data;
};

// enalbe manga
export const enalbeMangaService = async (id, token) => {
  const { data } = await Axios.patch(
    "/admin/managermanga",
    { mangaId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// get list user
export const getListUsersService = async (token) => {
  const { data } = await Axios.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// add member API call
export const addMembersService = async (mangaId, userId, token) => {
  const { data } = await Axios.put(
    "/admin/addmember",
    { mangaId: mangaId, userId: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// transfer of ownership API call
export const transferOfOwnershipService = async (mangaId, userId, token) => {
  const { data } = await Axios.put(
    "/admin/transfer",
    { mangaId: mangaId, userId: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// get chapter manager Function
export const getChaptersManagerService = async (id, token) => {
  const { data } = await Axios.get(`/admin/managerchap/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create chapter Function
export const createChapterService = async (token, id, chapter) => {
  const { data } = await Axios.post(`/admin/createchap/${id}`, chapter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get chapter info Function
export const getChapterInfoService = async (token, id, mangaId) => {
  const { data } = await Axios.get(`/admin/chapterinfo/${id}`, {
    params: {
      mangaId: mangaId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update chapter Function
export const updateChapterService = async (token, id, chapId, chapter) => {
  const { data } = await Axios.put(
    `/admin/updatechap/${id}/${chapId}`,
    chapter,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// delete chapters
export const deleteChaptersService = async (id, chapId, token) => {
  const { data } = await Axios.delete(`/admin/managerchap/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      chapId: chapId,
    },
  });
  return data;
};

// enalbe chapter
export const enalbeChapterService = async (id, chapId, token) => {
  const { data } = await Axios.patch(
    `/admin/managerchap/${id}`,
    { chapId: chapId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
