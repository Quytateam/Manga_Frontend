import React from "react";
import Layout from "../Layout/Layout";
import HistoryList from "../Components/Home/HistoryList";
import TopTitles from "../Components/Home/TopTitles";
import { Link, NavLink } from "react-router-dom";

function HistoryPage() {
  // const { userInfo } = useSelector((state) => state.userLogin);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = useMemo(
  //   () => new URLSearchParams(location.search),
  //   [location.search]
  // );
  // const initialPage = parseInt(queryParams.get("page")) || 0;
  // const [page, setPage] = useState(initialPage - 1);
  // useEffect(() => {
  //   const initialPage = parseInt(queryParams.get("page")) || 0;
  //   setPage(initialPage - 1);
  // }, [location.search, queryParams, navigate]);
  // const {
  //   isLoading,
  //   mangasHistory,
  //   // pages,
  //   // page: mangasGenrePage,
  //   totalMangas,
  //   isError,
  // } = useSelector((state) => state.getMangasHistory);
  // useEffect(() => {
  //   dispatch(getHistoryMangasAction(page + 1));
  //   if (isError) {
  //     toast.error(isError);
  //     // dispatch({
  //     //   type: "MANGAS_HISTORY_RESET",
  //     // });
  //   }
  // }, [page, dispatch, isError]);
  return (
    <Layout>
      <div id="ctl00_Breadcrumbs_pnlWrapper">
        <ul className="breadcrumb" itemType="http://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <NavLink
              to="/"
              className="itemcrumb"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Trang chủ</span>
            </NavLink>
            <meta itemProp="position" content={"1"} />
          </li>
          <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <NavLink
              to="/lich-su"
              className="itemcrumb active"
              itemProp="item"
              itemType="http://schema.org/Thing"
            >
              <span itemProp="name">Lịch sử</span>
            </NavLink>
            <meta itemProp="position" content={"2"} />
          </li>
        </ul>
      </div>
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          <div className="mrb10 Module Module-233">
            <div className="ModuleContent">
              <h1 className="page-title">
                Lịch sử đọc truyện <em className="fa fa-angle-right" />
              </h1>
              <div className="mrt15 visited-tab">
                <ul
                  className="comment-nav text-center"
                  style={{ fontSize: 16, marginBottom: 15 }}
                >
                  <li className="active">
                    <Link to="/lich-su">Theo tài khoản</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* {isLoading ? (
            <></>
          ) : mangasHistory?.length > 0 ? (
            <HistoryList
              mangas={mangasHistory}
              page={page}
              totalMangas={totalMangas}
            />
          ) : (
            <></>
          )} */}
          <HistoryList />
        </div>
        <div id="ctl00_divRight" className="right-side col-md-4 cmszone">
          {/* <ReadingHistory /> */}
          <TopTitles />
        </div>
      </div>
    </Layout>
  );
}

export default HistoryPage;
