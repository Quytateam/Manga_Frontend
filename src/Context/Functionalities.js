import { ratingMangaAction } from "../Redux/Actions/MangasActions";
import {
  deleteFollowMangaAction,
  followMangaAction,
  sendRequestAction,
} from "../Redux/Actions/userActions";

// check if manga is added to favorites
const IfMangaFollowed = (mangaId, followedMangas) => {
  return followedMangas?.includes(mangaId);
};

// follow manga functionalty
const FollowManga = (
  mangaId,
  dispatch,
  user,
  manganame,
  chapid
  // numFollow,
  // numFollow2,
  // setNumFollow
) => {
  if (user?.token !== undefined) {
    // const choose = numFollow2 !== undefined ? numFollow2 : numFollow;
    // setNumFollow(choose + 1);
    return dispatch(
      followMangaAction({
        mangaId: mangaId,
        manganame: manganame,
        chapid: chapid,
      })
    );
  }
};

// delete follow manga functionalty
const deleteFollowManga = (mangaId, dispatch, manganame, chapid) => {
  // const choose = numFollow2 !== undefined ? numFollow2 : numFollow;
  // setNumFollow(choose - 1);
  return dispatch(
    deleteFollowMangaAction({
      mangaId: mangaId,
      manganame: manganame,
      chapid: chapid,
    })
  );
};

// follow manga functionalty
const RatingManga = (manganame, rate, dispatch, user) => {
  if (user?.token !== undefined) {
    return dispatch(ratingMangaAction(manganame, rate));
  }
};

// Send request functionalty
const SendRequest = (
  setIsReport,
  dispatch,
  user,
  type,
  content,
  commentId,
  feedBackId = ""
) => {
  if (user?.token !== undefined) {
    setIsReport(false);
    return dispatch(
      sendRequestAction({
        commentId: commentId,
        feedBackId: feedBackId,
        type: type,
        content: content,
      })
    );
  }
};

export {
  IfMangaFollowed,
  FollowManga,
  deleteFollowManga,
  RatingManga,
  SendRequest,
};
