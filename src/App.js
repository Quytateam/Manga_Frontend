import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFound from "./Screens/NotFound";
import HistoryPage from "./Screens/HistoryPage";
import FollowManga from "./Screens/Dashboard/FollowManga";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import RecoverPassword from "./Screens/RecoverPassword";
import HotMangaPage from "./Screens/HotMangaPage";
import NewUpdatesPage from "./Screens/NewUpdatesPage";
import MPByGenre from "./Screens/MPByGenre";
import ASearchPage from "./Screens/ASearchPage";
import SingleManga from "./Screens/SingleManga";
import ReadPage from "./Screens/ReadPage";
import SecureInfo from "./Screens/Dashboard/SecureInfo";
import PublicInfo from "./Screens/PublicInfo";
import ToasterContainer from "./Components/Notfications/ToastContainer";
import VerifyEmailPage from "./Screens/VerifyEmailPage";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import ManageUser from "./Screens/Dashboard/Admin/ManageUser";
import CreateManga from "./Screens/Dashboard/Admin/CreateManga";
import ManageManga from "./Screens/Dashboard/Admin/ManageManga";
import EditManga from "./Screens/Dashboard/Admin/EditManga";
import ManageChapter from "./Screens/Dashboard/Admin/ManageChapter";
import CreateChapter from "./Screens/Dashboard/Admin/CreateChapter";
import EditChapter from "./Screens/Dashboard/Admin/EditChapter";
import BoyMangaPage from "./Screens/BoyMangaPage";
import GirlMangaPage from "./Screens/GirlMangaPage";
import ManageGenre from "./Screens/Dashboard/Admin/ManageGenre";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import {
  getExtendGenresAction,
  getNoExtendGenresAction,
} from "./Redux/Actions/GenresActions";
import toast from "react-hot-toast";
import { getTopMonthMangasAction } from "./Redux/Actions/MangasActions";
import { getAllFollowMangasAction } from "./Redux/Actions/userActions";
import ResetPassword from "./Screens/ResetPassword";
import JoinUpMangas from "./Screens/Dashboard/Admin/JoinUpMangas";
import ManageAllManga from "./Screens/Dashboard/Admin/ManageAllManga";

function App() {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError } = useSelector((state) => state.genreGetNoExtend);
  // const { chapid } = useParams();
  const { isError: extendError } = useSelector((state) => state.genreGetExtend);
  const { isError: topMonthError } = useSelector(
    (state) => state.getMangasTopMonth
  );
  // const location = useLocation();
  useEffect(() => {
    dispatch(getNoExtendGenresAction());
    dispatch(getExtendGenresAction());
    dispatch(getTopMonthMangasAction());
    if (userInfo?.token) {
      dispatch(getAllFollowMangasAction());
    }
    if (isError || extendError || topMonthError) {
      toast.error(isError || extendError);
    }
  }, [dispatch, userInfo, isError, extendError, topMonthError]);
  // useEffect(() => {
  //   const pathParts = location.pathname.split("/");
  //   if (location.pathname.includes("/truyen-tranh") && pathParts.length > 4) {
  //     console.log("Đang ở trang đọc truyện");
  //     // Thực hiện các hành động khác khi bạn ở trong path này
  //   }
  // }, [chapid, location]);
  return (
    <>
      <ToasterContainer />
      <Routes>
        {/* *****************PUBLIC ROUTES *************** */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/VerifyEmail" element={<VerifyEmailPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RecoverPassword" element={<RecoverPassword />} />
        <Route path="/auth/users/reset-password" element={<ResetPassword />} />
        <Route path="/hot" element={<HotMangaPage />} />
        <Route path="/newupdate" element={<NewUpdatesPage />} />
        <Route path="/lich-su" element={<HistoryPage />} />
        <Route path="/the-loai" element={<MPByGenre />} />
        <Route path="/the-loai/:genre" element={<MPByGenre />} />
        <Route path="/tim-truyen-nang-cao" element={<ASearchPage />} />
        <Route path="/truyen-con-trai" element={<BoyMangaPage />} />
        <Route path="/truyen-con-gai" element={<GirlMangaPage />} />
        <Route path="/truyen-tranh/:manganame" element={<SingleManga />} />
        <Route
          path="/truyen-tranh/:manganame/:chapname/:chapid"
          element={<ReadPage />}
        />
        <Route path="/user/:userid" element={<PublicInfo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/notpound" element={<NotFound />} />
        {/* *****************PRIVATE PUBLIC ROUTES *************** */}
        <Route element={<ProtectedRouter />}>
          <Route path="/theo-doi" element={<FollowManga />} />
          <Route path="/secure/:sidelink" element={<SecureInfo />} />
          <Route path="/admin/Create" element={<CreateManga />} />
          <Route path="/admin/ManageManga" element={<ManageManga />} />
          <Route path="/admin/JoinUpMangas" element={<JoinUpMangas />} />
          <Route path="/admin/ManageManga/Update/:id" element={<EditManga />} />
          <Route
            path="/admin/ManageManga/ManageChapter/:id"
            element={<ManageChapter />}
          />
          <Route
            path="/admin/JoinUpMangas/ManageChapter/:id"
            element={<ManageChapter />}
          />
          <Route
            path="/admin/ManageManga/CreateChapter/:id"
            element={<CreateChapter />}
          />
          <Route
            path="/admin/JoinUpMangas/CreateChapter/:id"
            element={<CreateChapter />}
          />
          <Route
            path="/admin/ManageManga/UpdateChapter/:id"
            element={<EditChapter />}
          />
          <Route
            path="/admin/JoinUpMangas/UpdateChapter/:id"
            element={<EditChapter />}
          />
          {/* *****************ADMIN ROUTES *************** */}
          <Route element={<AdminProtectedRouter />}>
            <Route path="/admin/ManageAllManga" element={<ManageAllManga />} />
            <Route
              path="/admin/ManageAllManga/Update/:id"
              element={<EditManga />}
            />
            <Route
              path="/admin/ManageAllManga/ManageChapter/:id"
              element={<ManageChapter />}
            />
            <Route
              path="/admin/ManageAllManga/UpdateChapter/:id"
              element={<EditChapter />}
            />
            <Route path="/admin/ManageUser" element={<ManageUser />} />
            <Route path="/admin/ManageGenre" element={<ManageGenre />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
