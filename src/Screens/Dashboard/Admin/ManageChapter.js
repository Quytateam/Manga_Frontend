import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../unit/formatDate.js";
import AdminLayout from "./AdminLayout.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteChaptersAction,
  enableChapterAction,
  getChaptersManagerAction,
} from "../../../Redux/Actions/MangasActions.js";

const getDynamicPart = (url) => {
  const parts = url.split("/");
  const adminIndex = parts.indexOf("admin");
  return adminIndex !== -1 && adminIndex + 1 < parts.length
    ? parts[adminIndex + 1]
    : null;
};

function ManageChapter() {
  const { id } = useParams();
  const url = window.location.href;
  const columns = [
    {
      name: "Tên chương",
      selector: (row) => row.chapName,
      sortable: true,
      cell: (row) => (
        <div>
          {row.chapName}: {row.title}
        </div>
      ),
      width: "35%",
    },
    {
      name: "Ngày đăng",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Enable",
      selector: (row) => row.enable,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>
          {row.enable === 1 ? (
            <Link
              to="#"
              className="btn btn-success btnAction btnActionDelete"
              data-action="1"
              style={{ display: "inline" }}
              onClick={() => handleEnable(row._id)}
            >
              Enable
            </Link>
          ) : (
            <Link
              to="#"
              className="btn btn-danger btnAction btnActionDelete"
              data-action="1"
              style={{ display: "inline" }}
              onClick={() => handleEnable(row._id)}
            >
              Disable
            </Link>
          )}
        </div>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <div className="">
          <Link
            to={`/admin/${getDynamicPart(url)}/UpdateChapter/${row._id}`}
            // state={{ mangaId: id }}
            state={{ mangaId: id, mangaName: mangaName || oldMangaName }}
          >
            <i className="pointer fa fa-pencil-square-o text-success "></i>
          </Link>
        </div>
      ),
      width: "10%",
    },
  ];
  const dispatch = useDispatch();
  const { isError, chaptersManager, mangaName } = useSelector(
    (state) => state.getChaptersManager
  );
  const oldChaptersRef = useRef();
  const oldMangaNameRef = useRef();
  useEffect(() => {
    if (chaptersManager && chaptersManager?.length > 0) {
      oldChaptersRef.current = chaptersManager;
    }
    if (mangaName !== undefined) oldMangaNameRef.current = mangaName;
  }, [chaptersManager, mangaName]);
  const oldChapters = oldChaptersRef.current;
  const oldMangaName = oldMangaNameRef.current;

  const { isError: enableError, isSuccess: enableSuccess } = useSelector(
    (state) => state.enableChapter
  );
  // delete
  const { isError: deleteError, isSuccess: deleteSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );
  // useEffect
  useEffect(() => {
    dispatch(getChaptersManagerAction(id));
    setRecords();
    if (isError || enableError || deleteError) {
      toast.error(isError || enableError || deleteError);
      dispatch({
        type: isError
          ? "CHAPTERS_MANAGER_RESET"
          : enableError
          ? "ENABLE_CHAPTER_RESET"
          : "DELETE_CHAPTERS_RESET",
      });
    }
  }, [
    dispatch,
    isError,
    id,
    enableError,
    enableSuccess,
    deleteError,
    deleteSuccess,
  ]);

  const [records, setRecords] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const handleFilter = (event) => {
    const newData = chaptersManager?.filter((row) => {
      return row.chapName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  const handleEnable = (chapterId) => {
    dispatch(enableChapterAction(id, chapterId));
  };
  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };
  const handleDeleteChapter = () => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa những chương truyện này không này?"
      )
    ) {
      const chapId = selectedRows?.map((manga) => manga._id);
      dispatch(deleteChaptersAction(id, chapId));
    }
  };
  return (
    <AdminLayout>
      <div className="account-info clearfix">
        <div className="account-form clearfix">
          <div className="panel-heading">
            <div className="flex justify-between">
              <h2 className="posttitle">{mangaName || oldMangaName}</h2>
              {getDynamicPart(url) === "ManageAllManga" ? (
                <></>
              ) : (
                <Link
                  to={`/admin/${getDynamicPart(url)}/CreateChapter/${id}`}
                  state={{ mangaName: mangaName || oldMangaName }}
                  className="btn btn-success flex items-center height-100"
                >
                  Thêm mới chương
                </Link>
              )}
            </div>
          </div>
          <div className="panel-body ">
            <div className="row">
              <div className="col-sm-12">
                <div className="custom-alert">
                  <div className="row">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6 text-right"></div>
                  </div>
                </div>
                <hr className="hr" />
              </div>
            </div>
            <div className="form-group pb-12">
              <div className="col-sm-2">
                {selectedRows.length > 0 && (
                  <div className="mb-8">
                    <div className="function mt-2 text-start">
                      <Link
                        to="#"
                        className="btn btn-danger btnAction btnActionDelete px-10"
                        data-action="1"
                        style={{ display: "inline" }}
                        onClick={handleDeleteChapter}
                      >
                        Xóa
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập từ khóa tìm kiêm"
                  onChange={handleFilter}
                />
              </div>
            </div>

            <div>
              <DataTable
                columns={columns}
                data={records ? records : chaptersManager || oldChapters}
                selectableRows
                fixedHeader
                pagination
                noDataComponent={<h1>Không tìm thấy kết quả nào</h1>}
                onSelectedRowsChange={handleRowSelected}
              />
            </div>
            <div className="alert alert-info hidden">
              Không tìm thấy kết quả nào
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageChapter;
