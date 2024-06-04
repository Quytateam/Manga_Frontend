import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  enableUserAction,
  getAllUsersAction,
  setAdminUserAction,
} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ManageUser() {
  const columns = [
    {
      name: "Tên người dùng",
      selector: (row) => row.fullName,
      sortable: true,
      width: "20%",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: "true",
      width: "30%",
    },
    {
      name: "Vi phạm",
      selector: (row) => row.numberOfViews,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>{row.numberOfWarnings}</div>
      ),
    },
    {
      name: "Enable",
      selector: (row) => row.enable,
      sortable: true,
      center: "true",
      cell: (row) => (
        <div style={{ paddingRight: "16px" }}>
          {!row.isAdmin &&
            (row.enable === 1 ? (
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
            ))}
        </div>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <div className="">
          {!row.isAdmin && (
            <>
              {/* <Link to={`UpdateUser/${row._id}`}>
                <i className="pointer fa fa-pencil-square-o text-success "></i>
              </Link> */}
              <Link
                to="#"
                onClick={() => handleSetAdmin(row._id, row.fullName)}
              >
                <i className="pointer fa fa-pencil-square-o text-success "></i>
              </Link>
              <span style={{ margin: "0 5px" }}></span>
              <Link to="#" onClick={() => handleDelete(row._id)}>
                <i className="text-red-600 fa fa-trash"></i>
              </Link>
            </>
          )}
        </div>
      ),
      width: "15%",
    },
  ];
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );
  const oldUsersRef = useRef();
  useEffect(() => {
    if (users && users?.length > 0) {
      oldUsersRef.current = users;
    }
  }, [users]);
  const oldUsers = oldUsersRef.current;
  // delete
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );
  // delete
  const { isError: enableError, isSuccess: enableSuccess } = useSelector(
    (state) => state.adminEnableUser
  );
  const { isError: setAdminError, isSuccess: setAdminSuccess } = useSelector(
    (state) => state.adminSetAdminUser
  );
  const [records, setRecords] = useState();
  const handleFilter = (event) => {
    const newData = users.filter((row) => {
      return row.fullName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  const handleEnable = (userId) => {
    dispatch(enableUserAction(userId));
  };
  const handleDelete = (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản người dùng này?")) {
      dispatch(deleteUserAction(userId));
    }
  };
  const handleSetAdmin = (userId, userName) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa muốn ${userName} trở thành một admin giống bạn không?`
      )
    ) {
      if (window.confirm("Bạn chắc chứ ?")) {
        dispatch(setAdminUserAction(userId));
      }
    }
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    setRecords();
    if (isError || deleteError || enableError || setAdminError) {
      toast.error(isError || deleteError || enableError || setAdminError);
      dispatch({
        type: isError
          ? "GET_ALL_USERS_RESET"
          : deleteError
          ? "DELETE_USER_RESET"
          : enableError
          ? "ENABLE_USER_RESET"
          : "SET_ADMIN_USER_RESET",
      });
    }
  }, [
    dispatch,
    isError,
    deleteError,
    isSuccess,
    enableError,
    enableSuccess,
    setAdminError,
    setAdminSuccess,
  ]);
  return (
    <AdminLayout>
      <div className="account-info clearfix">
        <div className="account-form clearfix">
          <div className="row">
            {users?.length > 0 || oldUsers?.length > 0 ? (
              <div className="panel-body " style={{ padding: "0 15px" }}>
                <div className="form-group pb-12">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên người dùng tìm kiêm"
                      onChange={handleFilter}
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={records ? records : users || oldUsers}
                  fixedHeader
                  pagination
                  noDataComponent={<h4>Không tìm thấy kết quả nào</h4>}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageUser;
