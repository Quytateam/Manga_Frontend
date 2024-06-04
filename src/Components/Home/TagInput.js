import React, { useCallback, useState, useEffect } from "react";
import "react-tagsinput/react-tagsinput.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ReactTags } from "react-tag-autocomplete";

function TagInput({ extendGenres, genres, setGenres }) {
  const filteredGenres =
    genres && extendGenres?.filter((genre) => genres.includes(genre?.name));
  const [selected, setSelected] = useState(
    genres
      ? filteredGenres.map((genre) => ({
          value: genre?._id,
          label: genre?.name,
        }))
      : []
  );
  const [suggestions, setSuggestions] = useState(
    extendGenres?.map((genre) => ({
      value: genre?._id,
      label: genre?.name,
    }))
  );

  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );
  useEffect(() => {
    setGenres(selected);
  }, [selected, setGenres]);
  return (
    <>
      <ReactTags
        selected={selected}
        suggestions={suggestions}
        onAdd={onAdd}
        onDelete={onDelete}
        noOptionsText="Không có thể loại này"
        placeholderText="Nhập tên thể loại và chọn"
      />
    </>
  );
}

export default TagInput;
