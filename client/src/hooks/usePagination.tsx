import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface PaginationReturn {
  currentPage: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageChangeHandler: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
  prevPageHandler: () => void;
  nextPageHandler: () => void;
}

export const usePagination = (): PaginationReturn => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const keyword = searchParams.get("keyword");
  const typeQuery = type ? `&type=${type}` : "";
  const keywordQuery = keyword ? `&keyword=${searchParams.get("keyword")}` : "";

  //페이징 버튼 클릭시 화면 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  //백엔드에서 보낸 page가 0으로 시작하기 때문에 currentPage의 값 조정
  const pageChangeHandler = (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    if (pageNumber === currentPage) {
      event.preventDefault();
      return;
    }
    setCurrentPage(pageNumber);
    navigate({
      pathname: "",
      search: `page=${pageNumber + 1}${typeQuery}${keywordQuery}`,
    });
    scrollToTop();
  };

  const prevPageHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate({
        pathname: "",
        search: `page=${currentPage}${typeQuery}${keywordQuery}`,
      });
      scrollToTop();
    }
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      navigate({
        pathname: "",
        search: `page=${currentPage + 2}${typeQuery}${keywordQuery}`,
      });
      scrollToTop();
    }
  };

  return {
    currentPage,
    totalPages,
    setTotalPages,
    setCurrentPage,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  };
};
