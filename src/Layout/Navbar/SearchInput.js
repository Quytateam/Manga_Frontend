// import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

function SearchInput() {
  //   const params = useParams();
  //   const [title, setTitle] = useState(params.get("title") || "");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/the-loai?keyword=${title}`);
  };
  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        className="searchinput form-control"
        placeholder="Tìm truyện..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="input-group-btn">
        <input
          type="submit"
          value=""
          className="searchbutton btn btn-default"
          onClick={(event) => handleSubmit(event)}
        />
      </div>
    </form>
  );
}

export default SearchInput;
