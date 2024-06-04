import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import PermissionModal from "../../../Components/Modals/PermissionModal";
import AdminLayout from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteMangasAction,
  enableMangaAction,
  getMangasManagerAction,
} from "../../../Redux/Actions/MangasActions";
function ManageManga() {
  const columns = [
    {
      name: "Tên truyện",
      selector: (row) => row.name,
      sortable: true,
      width: "35%",
    },
    {
      name: "Số chương",
      selector: (row) => row.numberOfChapters,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>{row.numberOfChapters}</div>
      ),
    },
    // { name: "Người đăng", selector: (row) => row.name },
    {
      name: "Số lượt xem",
      selector: (row) => row.numberOfViews,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>{row.numberOfViews}</div>
      ),
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
          <Link to={`ManageChapter/${row._id}`}>
            <i className="fa fa-list-ul"></i>
          </Link>
          <span style={{ margin: "0 5px" }}></span>
          <Link to={`Update/${row._id}`}>
            <i className="pointer fa fa-pencil-square-o text-success "></i>
          </Link>
          <span style={{ margin: "0 5px" }}></span>
          <Link
            to="#"
            onClick={() =>
              handleOpenModal(row._id, row.name, row.ownership, row.memberJoin)
            }
          >
            <i className="pointer fa fa-share-alt"></i>
            {/* <i class="ajax-loader-1"></i> */}
          </Link>
        </div>
      ),
      width: "15%",
    },
  ];
  const dispatch = useDispatch();
  const { isError, mangasManager } = useSelector(
    (state) => state.getMangasManager
  );
  const oldMangasRef = useRef();
  useEffect(() => {
    if (mangasManager && mangasManager?.length > 0) {
      oldMangasRef.current = mangasManager;
    }
  }, [mangasManager]);
  const oldMangas = oldMangasRef.current;
  // delete
  const { isError: deleteError, isSuccess: deleteSuccess } = useSelector(
    (state) => state.deleteMangas
  );
  const { isError: enableError, isSuccess: enableSuccess } = useSelector(
    (state) => state.enableManga
  );
  // useEffect
  useEffect(() => {
    dispatch(getMangasManagerAction());
    setRecords();
    if (isError || enableError || deleteError) {
      toast.error(isError || enableError || deleteError);
      dispatch({
        type: isError
          ? "MANGAS_MANAGER_RESET"
          : enableError
          ? "ENABLE_MANGA_RESET"
          : "DELETE_MANGAS_RESET",
      });
    }
  }, [
    dispatch,
    isError,
    enableError,
    enableSuccess,
    deleteError,
    deleteSuccess,
  ]);
  const [records, setRecords] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mangaId, setMangaId] = useState();
  const [mangaName, setMangaName] = useState();
  const [ownership, setOwnership] = useState();
  const [memberJoin, setMemberJoin] = useState([]);
  const handleFilter = (event) => {
    const newData = mangasManager?.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };
  const handleDeleteManga = () => {
    // if (selectedRows.length === mangasManager?.length) {
    //   console.log("All");
    // }
    if (
      window.confirm("Bạn có chắc chắn muốn xóa những truyện này không này?")
    ) {
      const id = selectedRows?.map((manga) => manga._id);
      dispatch(deleteMangasAction(id));
    }
  };
  const handleEnable = (mangaId) => {
    dispatch(enableMangaAction(mangaId));
  };
  const handleOpenModal = (id, name, ownership, memberJoin) => {
    setMangaId(id);
    setMangaName(name);
    setOwnership(ownership);
    setMemberJoin(memberJoin);
    setModalOpen(!modalOpen);
  };
  return (
    <AdminLayout>
      <div className="account-info clearfix">
        <div className="account-form clearfix">
          <div className="row">
            {mangasManager?.length > 0 || oldMangas?.length > 0 ? (
              <div className="panel-body " style={{ padding: "0 15px" }}>
                <div className="form-group pb-12">
                  <div className="col-sm-2">
                    {selectedRows.length > 0 && (
                      <div className="function mt-2 text-end">
                        <Link
                          to="#"
                          className="btn btn-danger"
                          data-action="1"
                          style={{ display: "inline" }}
                          onClick={() => handleDeleteManga()}
                        >
                          Xóa
                        </Link>
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
                <DataTable
                  columns={columns}
                  data={records ? records : mangasManager || oldMangas}
                  selectableRows
                  fixedHeader
                  pagination
                  noDataComponent={<h1>Không tìm thấy kết quả nào</h1>}
                  onSelectedRowsChange={handleRowSelected}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <PermissionModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          mangaId={mangaId}
          mangaName={mangaName}
          ownership={ownership}
          memberJoin={memberJoin}
        />
      )}
    </AdminLayout>
  );
}

export default ManageManga;
