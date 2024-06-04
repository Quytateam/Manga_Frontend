import React, { useCallback, useState, useEffect } from "react";
import "react-tagsinput/react-tagsinput.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ReactTags } from "react-tag-autocomplete";

function PermissionTag({
  listUsers,
  users = [],
  setSelectUser,
  changeModal = false,
}) {
  const filteredGenres =
    users && listUsers?.filter((user) => users?.includes(user?._id));
  const [selected, setSelected] = useState(
    users
      ? filteredGenres?.map((user) => ({
          value: user?._id,
          label: user?.fullName + " (" + user?.email + ")",
        }))
      : []
  );
  const [suggestions, setSuggestions] = useState(
    listUsers?.map((user) => ({
      value: user?._id,
      label: user?.fullName + " (" + user?.email + ")",
    }))
  );
  const onAdd = useCallback(
    (newTag) => {
      if (changeModal) setSelected([newTag]);
      else setSelected([...selected, newTag]);
    },
    [selected, changeModal]
  );

  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );
  useEffect(() => {
    if (setSelectUser !== undefined) setSelectUser(selected);
  }, [selected, setSelectUser]);
  return (
    <>
      <ReactTags
        selected={selected}
        suggestions={suggestions}
        onAdd={onAdd}
        onDelete={onDelete}
        noOptionsText="Tài khoản này không tồn tại"
        placeholderText="Nhập tên user và chọn"
      />
    </>
  );
}

export default PermissionTag;
