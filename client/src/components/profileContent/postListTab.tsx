import { useState } from "react";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { defaultInstance } from "../../interceptors/interceptors";
import { useLocation, useNavigate } from "react-router-dom";
import { findCategory } from "../../util/category";
import Empty from "../common/Empty";
import { useQueries } from "react-query";
import Loading from "../common/Loading";
import Error from "../common/Error";
// import { usePagination } from "../../hooks/usePagination";

// interface Data {
//   content: products[];
//   totalPages: number;
// }
interface image {
  imageId: number;
  path: string;
}

interface products {
  productId: number;
  title: string;
  createAt: string;
  images: image[];
  categoryId: number;
}

interface Review {
  postMemberId: number;
  targetMemberId: number;
  content: string;
  score: number;
  createdAt: string;
  img: string;
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
      &.select {
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
      width: 6.25rem;
      height: 6.25rem;
      padding: 0.5rem 0;
    }
    .postContainer {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      gap: 0.5rem;
      border-bottom: 1px solid ${COLOR.border};
      cursor: pointer;
    }
    .infoContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.5rem 0;
      font-size: ${FONT_SIZE.font_16};
      color: ${COLOR.mediumText};
      .postTitle {
        font-weight: bold;
        font-size: ${FONT_SIZE.font_20};
        color: ${COLOR.darkText};
      }
      .productName {
        font-weight: bold;
        color: ${COLOR.darkText};
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
    }
  }
`;

const PostListTab = (): JSX.Element => {
  const tabmenu = [
    { value: "cell", text: "판매글 목록" },
    { value: "leaveReview", text: "작성한 거래 후기" },
    { value: "getReview", text: "받은 거래 후기" },
  ];
  const [menu, setMenu] = useState("cell");
  const navigate = useNavigate();
  const location = useLocation();
  const Id = location.pathname.slice(8);
  // const {
  //   currentPage,
  //   totalPages,
  //   setTotalPages,
  //   pageChangeHandler,
  //   prevPageHandler,
  //   nextPageHandler,
  // } = usePagination();
  const result = useQueries([
    {
      queryKey: ["cellPost"],
      queryFn: async () => {
        const res = await defaultInstance.get(`/members/${Id}/products`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        return res.data.slice().reverse();
      },
    },
    {
      queryKey: ["leaveReview"],
      queryFn: async () => {
        const res = await defaultInstance.get(`/members/${Id}/reviews/post`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        return res.data;
      },
    },
    {
      queryKey: ["receivedReview"],
      queryFn: async () => {
        const res = await defaultInstance.get(`/members/${Id}/reviews`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        return res.data;
      },
    },
  ]);
  const cellPost: products[] = result[0].data;
  const leaveReview: Review[] = result[1].data;
  const recievedReview: Review[] = result[2].data;
  return (
    <PostListContainer>
      <ul className="postlistMenuContainer">
        {tabmenu.map((el) => (
          <li
            key={el.value}
            className={menu === el.value ? "select postlistTabMenu" : "postlistTabMenu"}
            onClick={() => setMenu(el.value)}
          >
            {el.text}
          </li>
        ))}
      </ul>
      <div className="tabContent">
        {menu === "cell" && result[0].isLoading && <Loading />}
        {menu === "cell" && result[0].isError && <Error />}
        {menu === "cell" &&
          cellPost &&
          cellPost.map((el) => (
            <div
              className="postContainer"
              key={el.productId}
              onClick={() => navigate(`/product/${findCategory(el.categoryId)}/${el.productId}`)}
            >
              <img className="postImg" src={el.images[0].path}></img>
              <div className="infoContainer">
                <div className="postTitle">{el.title}</div>
                <div className="createdAt">{el.createAt}</div>
              </div>
            </div>
          ))}
        {menu === "leaveReview" && result[1].isLoading && <Loading />}
        {menu === "leaveReview" && result[1].isError && <Error />}
        {menu === "leaveReview" &&
          leaveReview.map((el, idx) => (
            <div key={idx} className="postContainer">
              <img src={el.img}></img>
              <div className="infoContainer">
                <div className="postTitle">글제목</div>
                <div className="productName">제품이름</div>
                <div className="authorContainer">
                  <span className="author">{`작성자 id ${el.postMemberId}`}</span>
                  <span className="createdAt">{el.createdAt}</span>
                </div>
                <div>{`평점: ${el.score}`}</div>
                <p className="postContent">{el.content}</p>
              </div>
            </div>
          ))}
        {menu === "getReview" && result[2].isLoading && <Loading />}
        {menu === "getReview" && result[2].isError && <Error />}
        {menu === "getReview" &&
          recievedReview.map((el, idx) => (
            <div key={idx} className="postContainer">
              <img src={el.img}></img>
              <div className="infoContainer">
                <div className="postTitle">글제목</div>
                <div className="productName">제품이름</div>
                <div className="authorContainer">
                  <span className="author">{`작성자 id${el.postMemberId}`}</span>
                  <span className="createdAt">{el.createdAt}</span>
                </div>
                <div>{`평점: ${el.score}`}</div>
                <p className="postContent">{el.content}</p>
              </div>
            </div>
          ))}
      </div>
      {menu === "cell" && cellPost && cellPost.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
      {menu === "leaveReview" && leaveReview && leaveReview.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
      {menu === "getReview" && recievedReview && recievedReview.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
    </PostListContainer>
  );
};

export default PostListTab;
