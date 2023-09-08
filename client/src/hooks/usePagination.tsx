import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageChangeHandler = (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    if (pageNumber === currentPage) {
      event.preventDefault();
      return;
    }
    setCurrentPage(pageNumber);
  };

  const prevPageHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
