import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getMangasJoinUpAction } from "../../../Redux/Actions/MangasActions";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { formatDate } from "../../../unit/formatDate";

function JoinUpMangas() {
  const columns = [
    {
      name: "",
      sortable: true,
      width: "5%",
    },
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
      name: "Ngày tạo",
      selector: (row) => row.createdAt,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>{formatDate(row.createdAt)}</div>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <div className="">
          <Link to={`ManageChapter/${row._id}`}>
            <i className="fa fa-list-ul"></i>
          </Link>
          {/* <span style={{ margin: "0 5px" }}></span>
          <Link to={`Update/${row._id}`}>
            <i className="pointer fa fa-pencil-square-o text-success "></i>
          </Link> */}
          <span style={{ margin: "0 5px" }}></span>
        </div>
      ),
      width: "10%",
    },
  ];
  const dispatch = useDispatch();
  const { isError, mangasJoinUp } = useSelector(
    (state) => state.getMangasJoinUp
  );
  useEffect(() => {
    dispatch(getMangasJoinUpAction());
    setRecords();
    if (isError) {
      toast.error(isError);
      dispatch({
        type: "MANGAS_JOIN_UP_RESET",
      });
    }
  }, [dispatch, isError]);
  const [records, setRecords] = useState();
  const handleFilter = (event) => {
    const newData = mangasJoinUp?.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  return (
    <AdminLayout>
      <div className="account-info clearfix">
        <div className="account-form clearfix">
          <div className="row">
            {mangasJoinUp?.length > 0 && (
              <div className="panel-body " style={{ padding: "0 15px" }}>
                <div className="form-group pb-12">
                  <div className="col-sm-2"></div>
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
                  data={records ? records : mangasJoinUp}
                  fixedHeader
                  pagination
                  noDataComponent={<h1>Không tìm thấy kết quả nào</h1>}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default JoinUpMangas;
