import Axios from "./Axios";
// import toast from "react-hot-toast";

// ***************** PUBLIC APIs ****************

// register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// logout user Function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// login user API call
const loginService = async (user) => {
  if (user?.password) {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } else {
    const { data } = await Axios.post("/google/success", user);
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  }
};

// login user API call
const loginGoogleService = async () => {
  window.open("http://localhost:5000/api/google/callback", "_self");
};

// ResendEmailVerificationToken API call
const resendEmailVerificationTokenService = async (userId) => {
  // try {
  //   const { data } = await Axios.post(
  //     "/users/resend-email-verification-token",
  //     userId
  //   );
  //   toast.success("Check your mail");
  //   return data;
  // } catch (error) {
  //   if (error.response) {
  //     // Nếu có response từ server và mã lỗi là 401, có thể bạn muốn lấy message error từ đó
  //     const errorMessage = error.response.data.error;
  //     toast.error(errorMessage);
  //     console.log(errorMessage);
  //     return errorMessage; // Trả về message error
  //   }
  // }
  const { data } = await Axios.post(
    "/users/resend-email-verification-token",
    userId
  );
  return data;
};

// login user API call
const verifyEmailService = async (user) => {
  const { data } = await Axios.post("/users/verify-email", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  }
  return data;
};

// recover password API call
const recoverPasswordService = async (email) => {
  const { data } = await Axios.post("/users/forget-password", email);
  return data;
};

// reset password API call
const resetPasswordService = async (token, id, passwords) => {
  const { data } = await Axios.patch(
    `/users/reset-password?token=${token}&id=${id}`,
    passwords
  );
  return data;
};

// get user info Function
export const getUserInfoService = async (id) => {
  const { data } = await Axios.get(`/users/userinfo/${id}`);
  return data;
};

// ***************** PRIVATE APIs ****************

// update profile API call
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// change password API call
const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.patch("/users/password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create password API call
const createPasswordService = async (passwords, token) => {
  const { data } = await Axios.patch("/users/createpassword", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get follow mangas
const getFollowMangas = async (token, page) => {
  const { data } = await Axios.get("/users/follow", {
    params: {
      page: page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all favorite mangas
const getAllFollowMangas = async (token) => {
  const { data } = await Axios.get("/users/allfollow", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all comment mangas
const getCommentMangas = async (token, page) => {
  const { data } = await Axios.get("/users/comment", {
    params: {
      page: page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all notification
const getNotification = async (token) => {
  const { data } = await Axios.get("/users/notification", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all notification
const hiddenNotification = async (token, id) => {
  const { data } = await Axios.patch(
    `/users/notification/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// follow manga API call
const followMangaService = async (mangaId, token) => {
  const { data } = await Axios.post(
    "/users/follow",
    { mangaId: mangaId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// delete follow manga
const deleteFollowMangaService = async (mangaId, token) => {
  const { data } = await Axios.delete(`/users/follow/${mangaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// send request
const sendRequestService = async (request, token) => {
  const { data } = await Axios.post("/request/create", request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all data read
const getDataReadService = async (name, token) => {
  const { data } = await Axios.get(`/users/dataread/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ***************** ADMIN APIs ****************
// admin get all user
const getAllUsersService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// admin delete user
const deleteUsersService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// admin enalbe user
const enalbeUsersService = async (id, token) => {
  const { data } = await Axios.patch(`/users/enable/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// admin enalbe user
const setAdminUsersService = async (id, token) => {
  const { data } = await Axios.patch(`/users/admin/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// auto time read
const autoTimeReadService = async (manganame, chapname, chapid, token) => {
  if (token) {
    const { data } = await Axios.post(
      `/behavior/${manganame}/${chapname}/${chapid}`,
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

// stop corn job
const stopCronJobService = async (token) => {
  if (token) {
    const { data } = await Axios.get("/behavior/stop-cron", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
};

export {
  registerService,
  logoutService,
  loginGoogleService,
  loginService,
  resendEmailVerificationTokenService,
  verifyEmailService,
  recoverPasswordService,
  resetPasswordService,
  updateProfileService,
  changePasswordService,
  createPasswordService,
  getFollowMangas,
  getAllFollowMangas,
  getCommentMangas,
  getNotification,
  hiddenNotification,
  followMangaService,
  deleteFollowMangaService,
  sendRequestService,
  getDataReadService,
  getAllUsersService,
  deleteUsersService,
  enalbeUsersService,
  setAdminUsersService,
  autoTimeReadService,
  stopCronJobService,
};
