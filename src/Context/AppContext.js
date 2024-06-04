// import { createContext } from "react";
// import { useParams } from "react-router-dom";
// import { MangaData } from "../Data/MangaData";

// export const AppContext = createContext({});

// export const AppProvider = ({ children }) => {
//   const { manganame, chapid } = useParams();
//   const manga = MangaData.find((item) => item.nameOnUrl === manganame);
//   const chapter = manga.chapter.find((item) => item._id === chapid);
//   return (
//     <AppContext.Provider images={chapter.image}>{children}</AppContext.Provider>
//   );
// };
