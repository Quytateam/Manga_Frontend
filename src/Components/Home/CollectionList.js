import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionMangasAction } from "../../Redux/Actions/MangasActions";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const coverUrl = (genreName) => {
  const normalizedString = genreName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const nameOnUrl = normalizedString
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return nameOnUrl;
};

function CollectionList({ mangaId }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  // Bây giờ `listParam` sẽ chứa giá trị của tham số `list`
  //   console.log(listParam);
  //   console.log(location.pathname.includes("/truyen-tranh"));
  const { mangasCollection, isError } = useSelector(
    (state) => state.getMangasCollection
  );

  const oldCollectionRef = useRef();
  const oldMangaIdRef = useRef();
  useEffect(() => {
    if (mangasCollection && mangasCollection?.length > 0) {
      oldCollectionRef.current = mangasCollection;
    }
    if (mangaId) oldMangaIdRef.current = mangaId;
  }, [mangasCollection, oldMangaIdRef, mangaId]);

  const oldCollection = oldCollectionRef.current;
  const oldMangaId = oldMangaIdRef.current;

  const [isSingle, setIsSingle] = useState(true);

  useEffect(() => {
    dispatch(getCollectionMangasAction());
    if (mangaId) {
      const urlParams = new URLSearchParams(location.search);
      const listParam = urlParams.get("list");
      const isList = listParam === "true"; // Nếu listParam là "true", isList sẽ là true, ngược lại là false
      setIsSingle(isList);
    } else setIsSingle(true);
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError, location, mangaId]);
  const dataArray = mangasCollection || oldCollection;

  const limitedDataArray = urlParams.get("list")
    ? dataArray
    : dataArray?.slice(0, 5);
  return (
    <>
      {(mangasCollection || oldCollection)?.length > 0 && isSingle ? (
        <div className="visited-comics">
          <div
            className={`box darkBox ${
              urlParams.get("list") &&
              (mangasCollection || oldCollection)?.length > 3
                ? "list"
                : ""
            }`}
          >
            <h2>
              Danh sách kết hợp
              <Link
                className="view-all"
                to={`/truyen-tranh/${
                  (mangasCollection || oldCollection)[0]?.nameOnUrl
                }-${(mangasCollection || oldCollection)[0]?._id}?list=true`}
              >
                Xem tất cả
              </Link>
            </h2>
            <ul className="list-unstyled">
              {limitedDataArray.map((manga) => (
                <li className="clearfix" key={manga?._id}>
                  <div className="t-item">
                    {/* margin-left: -64px; */}
                    {(mangaId || oldMangaId) && (
                      <span className="thumb manga-render" title={manga?.name}>
                        {mangaId === manga?._id && (
                          <i className="fa fa-angle-right" />
                        )}
                      </span>
                    )}
                    <Link
                      className="thumb"
                      title={manga?.name}
                      to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}?list=true`}
                    >
                      <img
                        className="center"
                        alt={manga?.name}
                        data-original={manga?.image}
                        src={manga?.image}
                      />
                    </Link>
                    <h3 className="title">
                      <Link
                        to={`/truyen-tranh/${manga?.nameOnUrl}-${manga?._id}?list=true`}
                      >
                        {manga?.name}
                      </Link>
                    </h3>
                    <p className="chapter">
                      {manga?.genre?.slice(0, 2).map((genre, idx) => (
                        <span key={idx}>
                          <Link to={`/the-loai/${coverUrl(genre)}`}>
                            {genre}
                          </Link>
                          {idx !== manga?.genre?.length - 1 && " - "}
                        </span>
                      ))}{" "}
                      {manga?.genre?.length > 2 && "..."}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CollectionList;
