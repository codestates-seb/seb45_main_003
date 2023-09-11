import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1") - 1);
  const [totalPages, setTotalPages] = useState(0);

  //백엔드에서 보낸 page가 0으로 시작하기 때문에 currentPage의 값 조정
  const pageChangeHandler = (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    if (pageNumber === currentPage) {
      event.preventDefault();
      return;
    }
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber + 1}`);
  };

  const prevPageHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate(`?page=${currentPage}`);
    }
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      navigate(`?page=${currentPage + 2}`);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [location.pathname]);

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
