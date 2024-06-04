import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PermissionTag from "../Home/PermissionTag";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addMembersAction,
  getListUsersAction,
  transferOfOwnershipAction,
} from "../../Redux/Actions/MangasActions";
import { InlineError } from "../Notfications/Error";

function PermissionModal({
  modalOpen,
  setModalOpen,
  mangaId,
  mangaName,
  ownership,
  memberJoin,
  isAdmin,
}) {
  const dispatch = useDispatch();
  const [changeModal, setChangeModal] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [selectUser, setSelectUser] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const { isError, listUsers } = useSelector((state) => state.getListUsers);
  const { isError: addMembersError } = useSelector((state) => state.addMembers);
  const { isError: transferError } = useSelector(
    (state) => state.transferOfOwnership
  );
  const handleChange = (type) => {
    if (type !== isDefault) {
      setIsUser(false);
      setChangeModal(!changeModal);
      setIsDefault(!isDefault);
    }
  };
  const handleCloseModal = () => {
    setChangeModal(false);
    setIsDefault(false);
    setModalOpen(!modalOpen);
  };
  const handleAddMember = () => {
    if (selectUser?.length === 0) setIsUser(true);
    else {
      setIsUser(false);
      const userId = selectUser?.map((user) => user.value);
      dispatch(
        addMembersAction({
          mangaId: mangaId,
          userId: userId,
          isAdmin: isAdmin,
        })
      );
      setModalOpen(false);
    }
  };
  const handleTransferOfOwnership = () => {
    if (selectUser?.length === 0) setIsUser(true);
    else {
      setIsUser(false);
      const id = selectUser?.map((user) => user.value);
      const userId = id[0];
      dispatch(
        transferOfOwnershipAction({
          mangaId: mangaId,
          userId: userId,
          isAdmin: isAdmin,
        })
      );
      setModalOpen(false);
    }
  };
  // useEffect
  useEffect(() => {
    dispatch(getListUsersAction());
    if (isError || addMembersError || transferError) {
      toast.error(isError || addMembersError || transferError);
      dispatch({
        type: isError
          ? "GET_LIST_USERS_RESET"
          : addMembersError
          ? "ADD_MEMBERS_RESET"
          : "TRANSFER_OF_OWNERSHIP_RESET",
      });
    }
  }, [dispatch, isError, addMembersError, transferError]);
  return (
    <div
      className={`modal fade ${modalOpen ? "in" : ""}`}
      id="modalMangaShare"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-b-0">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <ul className="nav nav-tabs main-tab lazy-module">
              <li
                className={`tab-pane ${changeModal ? "" : "active"}`}
                id="tabShareQuyen"
              >
                <Link
                  data-toggle="tab"
                  to="#"
                  onClick={() => handleChange(false)}
                >
                  Share quyền
                </Link>
              </li>
              <li
                className={`tab-pane ${changeModal ? "active" : ""}`}
                id="tabChuyenQuyen"
              >
                <Link
                  className="bg-transparent"
                  data-toggle="tab"
                  to="#"
                  onClick={() => handleChange(true)}
                >
                  Chuyển quyền
                </Link>
              </li>
            </ul>
          </div>
          {/* tabIndex */}
          <div className="modal-body form-horizontal" id="modalbody">
            <div className="tab-content">
              {/* <input
                className="text-black"
                type="hidden"
                id="txtMangaId"
                name="txtMangaId"
                value={mangaId}
              /> */}
              <div
                role="tabpanel"
                className={`tab-pane ${changeModal ? "" : "active"}`}
                id="sharequyen"
              >
                <div className="main-share">
                  <div className="form-group">
                    <label
                      className="col-sm-3 control-label pt-0 text-bold"
                      htmlFor="name"
                    >
                      Tên truyện
                    </label>
                    <div className="col-sm-9">
                      <div className="text" id="lblMangaName">
                        {mangaName}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="col-sm-3 control-label text-bold"
                      htmlFor="name"
                    >
                      Nhập tên user
                    </label>
                    <div className="col-sm-9">
                      {listUsers?.length > 0 && (
                        <PermissionTag
                          listUsers={listUsers}
                          setSelectUser={setSelectUser}
                          selectUser={selectUser}
                          users={memberJoin}
                        />
                      )}
                      {isUser && (
                        <InlineError text={"Vui lòng chọn tên người dùng"} />
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                      <input
                        type="submit"
                        id="btnUpdateMangaShare"
                        className="btn btn-success"
                        name="btnUpdateMangaShare"
                        value="Cập nhật"
                        onClick={() => handleAddMember()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {changeModal && (
                <div
                  role="tabpanel"
                  className={`tab-pane ${changeModal ? "active" : ""}`}
                  id="chuyenquyen"
                >
                  <div className="main-share">
                    <div className="form-group">
                      <label
                        className="col-sm-3 control-label pt-0 text-bold"
                        htmlFor="name"
                      >
                        Tên truyện
                      </label>
                      <div className="col-sm-9">
                        <div className="text" id="lblMangaName">
                          {mangaName}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="col-sm-3 control-label text-bold"
                        htmlFor="name"
                      >
                        Nhập tên user
                      </label>
                      <div className="col-sm-9">
                        {listUsers?.length > 0 && (
                          <PermissionTag
                            listUsers={listUsers}
                            setSelectUser={setSelectUser}
                            selectUser={selectUser}
                            changeModal={changeModal}
                            users={ownership?.split(",")}
                          />
                        )}
                        {isUser && (
                          <InlineError text={"Vui lòng chọn tên người dùng"} />
                        )}
                        <div className="mb-4"></div>
                        <div className="label label-danger">
                          Chỉ được chọn một người
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-9 col-sm-offset-3">
                        <input
                          type="submit"
                          id="btnMangaMoveSave"
                          className="btn btn-success"
                          name="btnMangaMoveSave"
                          value="Chuyển quyền"
                          onClick={() => handleTransferOfOwnership()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div
              className="overlay-content"
              style={{ position: "relative", height: "100%" }}
            >
              <img
                src="https://blogtruyenmoi.com/Content/images/ajax-loader-1.gif"
                className="img-load"
                alt="loading..."
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <p className="pt-10" style={{ textAlign: "center" }}>
                Đang tải...
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermissionModal;
