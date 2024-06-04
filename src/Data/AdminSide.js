import CreateManga from "../Screens/Dashboard/Admin/CreateManga.js";
import EditManga from "../Screens/Dashboard/Admin/EditManga.js";
import ManageChapter from "../Screens/Dashboard/Admin/ManageChapter.js";
import ManageManga from "../Screens/Dashboard/Admin/ManageManga.js";
import CreateChapter from "../Screens/Dashboard/Admin/CreateChapter.js";
import EditChapter from "../Screens/Dashboard/Admin/EditChapter.js";

export const AdminSide = [
  {
    name: "Thêm truyên mới",
    otherName: "Create",
    link: "Create",
    icon: "fa fa-pencil-square-o",
    component: <CreateManga />,
  },
  {
    name: "Truyện đã đăng",
    otherName: "ManageManga",
    link: "ManageManga",
    icon: "fa fa-book",
    component: <ManageManga />,
    func: [
      {
        name: "Cập nhật truyện",
        otherName: "Update",
        link: "Update",
        component: <EditManga />,
      },
      {
        name: "Quản lý chương",
        otherName: "ManageChapter",
        link: "ManageChapter",
        component: <ManageChapter />,
      },
      {
        name: "Thêm chương mới",
        otherName: "CreateChapter",
        link: "CreateChapter",
        component: <CreateChapter />,
      },
      {
        name: "Cập nhật chương",
        otherName: "UpdateChapter",
        link: "UpdateChapter",
        component: <EditChapter />,
      },
    ],
  },
];
