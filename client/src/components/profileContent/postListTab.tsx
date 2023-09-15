import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { defaultInstance } from "../../interceptors/interceptors";
import { useLocation, useNavigate } from "react-router-dom";
// import { findCategory } from "../../util/category";
import Empty from "../common/Empty";
import { useQuery } from "react-query";
import Loading from "../common/Loading";
// import ErrorIndication from "../../pages/ErrorIndication";
import Pagination from "../common/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { translateProductStatus } from "../../util/productStatus";
import { useRecoilState } from "recoil";
import { postListTabState } from "../../atoms/atoms";
import Button from "../common/Button";

interface Data {
  content: postContent[];
  totalPages: number;
}
interface image {
  imageId: number;
  path: string;
}

interface postContent {
  productId: number;
  title: string;
  images?: image[];
  categoryId: number;
  reviewId: number;
  postMemberId: number;
  postMemberName: string;
  content: string;
  score: number;
  createdAt: string;
  productStatus: string;
  productImages?: image[];
  reviewTitle: string;
}

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100%;
  .postlistMenuContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .postlistTabMenu {
      width: calc(100% / 3);
      border: 1px solid ${COLOR.gray_300};
      border-radius: 6px 6px 0 0;
      padding: 0.5rem 0.75rem;
      font-size: ${FONT_SIZE.font_16};
      &:hover {
        background-color: ${COLOR.primary};
      }
      &.selected {
        font-weight: bold;
        background-color: ${COLOR.secondary};
      }
    }
  }
  .empty {
    height: 25rem;
    position: relative;
  }
  .tabContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .postImg {
      width: 9.375rem;
      height: 9.375rem;
      padding: 1rem 0;
    }
    .postContainer {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      gap: 1rem;
      border-bottom: 1px solid ${COLOR.border};
    }
    .infoContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 1rem 0;
      font-size: ${FONT_SIZE.font_16};
      color: ${COLOR.mediumText};
      .postTitle {
        font-weight: bold;
        font-size: ${FONT_SIZE.font_20};
        color: ${COLOR.darkText};
        cursor: pointer;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .productName {
        font-weight: bold;
        color: ${COLOR.darkText};
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .authorContainer {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        .author {
          font-weight: bold;
          color: ${COLOR.darkText};
        }
      }
      .postContent {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .reviewModifyContainer {
      padding: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
`;

const PostListTab = (): JSX.Element => {
  const tabmenu = [
    { value: "cell", text: "판매글 목록" },
    { value: "leaveReview", text: "작성한 거래 후기" },
    { value: "getReview", text: "받은 거래 후기" },
  ];
  const [menu, setMenu] = useRecoilState(postListTabState);
  const navigate = useNavigate();
  const location = useLocation();
  const loginuserId = localStorage.getItem("Id");
  const Id = location.pathname.slice(8);
  const searchParams = new URLSearchParams(location.search);
  const handleMenu = (value: string): void => {
    if (menu !== value) {
      setMenu(value);
      navigate(`${location.pathname}?menu=${searchParams.get("menu")}&tabmenu=${value}&page=1`);
    }
  };
  const ITEMS_PER_VIEW = 10;
  const {
    currentPage,
    totalPages,
    setTotalPages,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  } = usePagination();
  const { isLoading, data: result } = useQuery<Data>(
    ["postList", { menu, currentPage }],
    async () => {
      const currentPageParam = parseInt(searchParams.get("page") || "1");
      const pageQueryParam = `page=${currentPageParam - 1}&size=${ITEMS_PER_VIEW}`;
      if (menu === "cell") {
        const res = await defaultInstance.get(`/members/${Id}/products?${pageQueryParam}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        navigate(`?menu=profile&tabmenu=${menu}&page=${currentPageParam}`);
        return res.data;
      } else if (menu === "leaveReview") {
        const res = await defaultInstance.get(`/members/${Id}/reviews/post?${pageQueryParam}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        navigate(`?menu=profile&tabmenu=${menu}&page=${currentPageParam}`);
        return res.data;
      } else if (menu === "getReview") {
        const res = await defaultInstance.get(`/members/${Id}/reviews?${pageQueryParam}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        navigate(`?menu=profile&tabmenu=${menu}&page=${currentPageParam}`);
        return res.data;
      }
    },
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
        console.log(data);
      },
    },
  );
  const navigateModifyReview = (review: postContent) => {
    console.log(review);
    navigate(`/review/${Id}?productId=${review.productId}&reviewId=${review.reviewId}`);
  };
  //refetch되기전 화면에 그리는 과정에서 리뷰에서는 판매글에 없는 데이터가 있어서 오류 발생
  //삼항연산자로 해결
  return (
    <PostListContainer>
      <ul className="postlistMenuContainer">
        {tabmenu.map((el) => (
          <li
            key={el.value}
            className={menu === el.value ? "selected postlistTabMenu" : "postlistTabMenu"}
            onClick={() => handleMenu(el.value)}
          >
            {el.text}
          </li>
        ))}
      </ul>
      <div className="tabContent">
        {isLoading && <Loading />}
        {menu === "cell" &&
          result?.content.map((el, idx) => (
            <div className="postContainer" key={idx}>
              <img className="postImg" src={el.images ? el.images[0].path : ""}></img>
              <div className="infoContainer">
                <div className="postTitle" onClick={() => navigate(`/product/${el.productId}`)}>
                  {el.title}
                </div>
                <div className="createdAt">{el.createdAt}</div>
                <div>{translateProductStatus(el.productStatus)}</div>
              </div>
            </div>
          ))}
        {menu === "leaveReview" &&
          result?.content.map((el, idx) => (
            <div key={idx} className="postContainer">
              {el.productImages && <img className="postImg" src={el.productImages[0].path}></img>}
              <div className="infoContainer">
                <div className="postTitle">{el.reviewTitle}</div>
                <div className="productName">{el.title}</div>
                <div className="authorContainer">
                  <span className="author">{`작성자 : ${el.postMemberName}`}</span>
                  <span className="createdAt">{el.createdAt}</span>
                </div>
                <div>{`평점: ${el.score}`}</div>
                <p className="postContent">{el.content}</p>
              </div>
              {loginuserId === Id && (
                <div className="reviewModifyContainer">
                  <Button
                    type="button"
                    $text="후기 수정"
                    $design="black"
                    onClick={() => navigateModifyReview(el)}
                  />
                </div>
              )}
            </div>
          ))}
        {menu === "getReview" &&
          result?.content.map((el, idx) => (
            <div key={idx} className="postContainer">
              {el.productImages && <img className="postImg" src={el.productImages[0].path}></img>}
              <div className="infoContainer">
                <div className="postTitle">{el.reviewTitle}</div>
                <div className="productName">{el.title}</div>
                <div className="authorContainer">
                  <span className="author">{`작성자 : ${el.postMemberName}`}</span>
                  <span className="createdAt">{el.createdAt}</span>
                </div>
                <div>{`평점: ${el.score}`}</div>
                <p className="postContent">{el.content}</p>
              </div>
            </div>
          ))}
      </div>
      {result?.content.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
      <Pagination
        {...{
          currentPage,
          totalPages,
          pageChangeHandler,
          prevPageHandler,
          nextPageHandler,
        }}
      />
    </PostListContainer>
  );
};

export default PostListTab;
