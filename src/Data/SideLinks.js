import Dashboard from "../Screens/Dashboard/Dashboard.js";
import UserProfile from "../Screens/Dashboard/UserProfile.js";
import ComicFollowed from "../Screens/Dashboard/ComicFollowed.js";
import Comments from "../Screens/Dashboard/Comments.js";
import Notifications from "../Screens/Dashboard/Notifications.js";
import ChangePassword from "../Screens/Dashboard/ChangePassword.js";
import CreatePassword from "../Screens/Dashboard/CreatePassword.js";

export const SideLinks = [
  {
    name: "Thông tin chung",
    otherName: "Dashboard",
    link: "Dashboard",
    icon: "fa fa-tachometer",
    component: <Dashboard />,
  },
  {
    name: "Thông tin tài khoản",
    otherName: "UserProfile",
    link: "UserProfile",
    icon: "fa fa-info-circle",
    component: <UserProfile />,
  },
  {
    name: "Truyện theo dõi",
    otherName: "ComicFollowed",
    link: "ComicFollowed",
    icon: "fa fa-book",
    component: <ComicFollowed />,
  },
  {
    name: "Bình luận",
    otherName: "Comments",
    link: "Comments",
    icon: "fa fa-comments",
    component: <Comments />,
  },
  {
    name: "Thông báo",
    otherName: "Notifications",
    link: "Notifications",
    icon: "fa fa-comment",
    component: <Notifications />,
  },
  {
    name: "Đổi mật khẩu",
    otherName: "ChangePassword",
    link: "ChangePassword",
    icon: "fa fa-lock",
    component: <ChangePassword />,
  },
  //   {
  //     name: "Thoát",
  //     otherName: "Exist",
  //     link: "",
  //     icon: "fa fa-sign-out",
  //   },
];

export const SideLinks2 = [
  {
    name: "Thông tin chung",
    otherName: "Dashboard",
    link: "Dashboard",
    icon: "fa fa-tachometer",
    component: <Dashboard />,
  },
  {
    name: "Thông tin tài khoản",
    otherName: "UserProfile",
    link: "UserProfile",
    icon: "fa fa-info-circle",
    component: <UserProfile />,
  },
  {
    name: "Truyện theo dõi",
    otherName: "ComicFollowed",
    link: "ComicFollowed",
    icon: "fa fa-book",
    component: <ComicFollowed />,
  },
  {
    name: "Bình luận",
    otherName: "Comments",
    link: "Comments",
    icon: "fa fa-comments",
    component: <Comments />,
  },
  {
    name: "Thông báo",
    otherName: "Notifications",
    link: "Notifications",
    icon: "fa fa-comment",
    component: <Notifications />,
  },
  {
    name: "Tạo mật khẩu mới",
    otherName: "CreatePassword",
    link: "CreatePassword",
    icon: "fa fa-lock",
    component: <CreatePassword />,
  },
  //   {
  //     name: "Thoát",
  //     otherName: "Exist",
  //     link: "",
  //     icon: "fa fa-sign-out",
  //   },
];
