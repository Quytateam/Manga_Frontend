import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  deleteGenreAction,
  enableGenreAction,
  getAllGenresAction,
} from "../../../Redux/Actions/GenresActions";
import { formatDate } from "../../../unit/formatDate";
import GenreModal from "../../../Components/Modals/GenreModal";
import toast from "react-hot-toast";

function ManageGenre() {
  const columns = [
    {
      name: "Tên truyện",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mô tả",
      selector: (row) => row.desc,
      sortable: true,
      cell: (row) => <div style={{ paddingRight: "16px" }}>{row.desc}</div>,
    },
    {
      name: "Mở rộng",
      selector: (row) => row.isExtend,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>
          {row.isExtend ? "Nâng cao" : "Nguyên bản"}
        </div>
      ),
    },
    {
      name: "Ngày tạo",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>{formatDate(row.createdAt)}</div>
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
          <Link
            to="#"
            onClick={() =>
              OnEditFunction(row._id, row.name, row.isExtend, row.desc)
            }
          >
            <i className="pointer fa fa-pencil-square-o text-success "></i>
            {/* <i class="ajax-loader-1"></i> */}
          </Link>
          <span style={{ margin: "0 5px" }}></span>
          <Link to="#" onClick={() => handleDelete(row._id)}>
            <i className="text-red-600 fa fa-trash"></i>
          </Link>
        </div>
      ),
      width: "10%",
    },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [genre, setGenre] = useState();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  // all genres
  // isLoading
  const { genres, isError } = useSelector((state) => state.genreGetAll);
  // delete genre
  const { isSuccess, isError: deleteError } = useSelector(
    (state) => state.genreDelete
  );
  const { isError: enableError, isSuccess: enableSuccess } = useSelector(
    (state) => state.genreEnable
  );
  const oldGenresRef = useRef();
  useEffect(() => {
    if (genres && genres?.length > 0) {
      oldGenresRef.current = genres;
    }
  }, [genres]);
  const oldGenres = oldGenresRef.current;

  const handleEnable = (genreId) => {
    dispatch(enableGenreAction(genreId));
  };
  const [records, setRecords] = useState();
  const handleFilter = (event) => {
    const newData = genres.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  const handleDelete = (genreId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thể loại này ?")) {
      dispatch(deleteGenreAction(genreId));
    }
  };
  const OnEditFunction = (id, name, isExtend, desc) => {
    setGenre({
      id: id,
      name: name,
      isExtend: isExtend ? "Extend" : "",
      desc: desc,
    });
    setModalOpen(!modalOpen);
  };
  // useEffect
  useEffect(() => {
    dispatch(getAllGenresAction());
    setRecords();
    setActive(false);
    if (isError || deleteError || enableError) {
      toast.error(isError || deleteError || enableError);
      dispatch({
        type: isError
          ? "GET_ALL_GENRES_RESET"
          : deleteError
          ? "DELETE_GENRE_RESET"
          : "ENABLE_GENRE_RESET",
      });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_GENRE_RESET" });
    }
  }, [
    dispatch,
    active,
    isError,
    isSuccess,
    deleteError,
    enableError,
    enableSuccess,
  ]);
  return (
    <AdminLayout>
      <div className="account-info clearfix">
        <div className="account-form clearfix">
          <div className="row">
            {(genres || oldGenres)?.length > 0 ? (
              <div className="panel-body " style={{ padding: "0 15px" }}>
                <div className="form-group pb-12">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên thể loại tìm kiêm"
                      onChange={handleFilter}
                    />
                  </div>
                  <div className="col-sm-2">
                    <Link
                      to="#"
                      onClick={() => setModalOpen(true)}
                      className="btn btn-success flex items-center height-100"
                    >
                      Thêm mới
                    </Link>
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={records ? records : genres || oldGenres}
                  fixedHeader
                  pagination
                  noDataComponent={<h1>Không tìm thấy kết quả nào</h1>}
                  // onSelectedRowsChange={handleRowSelected}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <GenreModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        genre={genre}
        setGenre={setGenre}
        setActive={setActive}
      />
    </AdminLayout>
  );
}

export default ManageGenre;
