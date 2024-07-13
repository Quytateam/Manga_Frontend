import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationAction,
  hiddenNotificationAction,
  seenNotificationAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { formatDate } from "../../unit/formatDate";
import { Link } from "react-router-dom";

function Notifications() {
  const dispatch = useDispatch();
  const { isError, notificationList } = useSelector(
    (state) => state.userGetNotification
  );
  const oldNotificateRef = useRef();
  useEffect(() => {
    if (notificationList && notificationList?.length > 0) {
      oldNotificateRef.current = notificationList;
    }
  }, [notificationList]);

  const oldNotificate = oldNotificateRef.current;
  const handleHiddenNotificate = (id) => {
    dispatch(hiddenNotificationAction(id));
  };
  // useEffect
  useEffect(() => {
    dispatch(seenNotificationAction());
    dispatch(getNotificationAction());
    if (isError) {
      toast.error(isError);
      dispatch({
        type: "GET_NOTIFICATION_RESET",
      });
    }
  }, [dispatch, isError]);
  return (
    <section className="user-table clearfix">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="nowrap">Nội dung</th>
              <th className="nowrap">Thời gian</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(notificationList || oldNotificate)?.length > 0 ? (
              (notificationList || oldNotificate)?.map((nofi) => (
                <tr key={nofi?._id} className="unread">
                  <td></td>
                  <td>
                    <div className="word-wrap">{nofi?.content}</div>
                  </td>
                  <td className="nowrap">
                    <time className="time">{formatDate(nofi?.createdAt)}</time>
                  </td>
                  <td>
                    <Link
                      className=""
                      data-id="20857"
                      data-key="a96f7c8f-f7dc-b375-bdef-ce7b9210e0a4"
                      onClick={() => handleHiddenNotificate(nofi?._id)}
                    >
                      <i className="fa fa-times"></i> Ẩn
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Notifications;
