import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { chunk } from "../../unit/chuck.js";
import { useSelector } from "react-redux";

function DropDown({ ...props }) {
  // no extend categories
  const { noExtendGenres, isLoading } = useSelector(
    (state) => state.genreGetNoExtend
  );
  const { genre } = useParams();
  const [selectedGenre, setSelectedGenre] = useState(genre || "tat-ca");
  // const { genres } = props?.data;
  // console.log(genres);
  // const Filter = [
  //   {
  //     items: genres?.length > 0 ? [...genres] : [{ title: "No genre found" }],
  //     title: "Genre",
  //   },
  // ];
  const Filter = [
    {
      items: isLoading
        ? [{ title: "No genre found" }]
        : noExtendGenres?.length > 0
        ? [...noExtendGenres]
        : [{ title: "No genre found" }],
      title: "Genre",
    },
  ];
  useEffect(() => {
    // dispatch(getNoExtendGenresAction());
    setSelectedGenre(genre);
  }, [genre, noExtendGenres]);
  return (
    <>
      {Filter.map((item, index) => (
        <div key={index}>
          {chunk(item.items, 14).map((col, idx) => (
            <div className="col-sm-3" key={idx}>
              <ul className="nav">
                {idx === 0 && (
                  <li key={0}>
                    <NavLink
                      title="Tất cả"
                      data-title="Tất cả"
                      to="/the-loai"
                      className={`${selectedGenre == null ? "main-genre" : ""}`}
                    >
                      Tất cả
                    </NavLink>
                  </li>
                )}
                {col.map((genre, subIdx) => (
                  <li key={`${genre._id}-${subIdx}`}>
                    <Link
                      title={genre.name}
                      data-title={genre.name}
                      className={`${
                        selectedGenre === genre.nameOnUrl ? "main-genre" : ""
                      }`}
                      to={`/the-loai/${genre.nameOnUrl}`}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default DropDown;
