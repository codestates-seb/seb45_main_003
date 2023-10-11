import styled from "styled-components";
import { ReactComponent as PagingArrow } from "../../assets/images/PagingArrow.svg";
import { COLOR } from "../../constants/color";

interface paginationProp {
  prevPageHandler: () => void;
  nextPageHandler: () => void;
  totalPages: number;
  currentPage: number;
  pageChangeHandler: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
}

const StyledPagination = styled.div`
  padding: 1.5rem 0;
  display: flex;
  flex-flow: row;
  gap: 0.25rem;

  button {
    width: 30px;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid ${COLOR.border};
    color: ${COLOR.mediumText};
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.5rem;
    border-radius: 4px;

    &:hover,
    &.active {
      background: ${COLOR.primary};
      border: 1px solid ${COLOR.primary};
      color: ${COLOR.darkText};
    }

    &.disabled {
      display: none;
    }

    .rotate {
      transform: rotate(180deg);
    }
  }
`;

const Pagination = ({
  prevPageHandler,
  nextPageHandler,
  currentPage,
  totalPages,
  pageChangeHandler,
}: paginationProp) => {
  //0부터 totalPages까지의 숫자 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  //페이징 버튼 5개씩 노출
  const startIndex = Math.floor(currentPage / 5) * 5;
  const endIndex = Math.min(startIndex + 5, totalPages);
  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  return (
    <StyledPagination>
      <button onClick={prevPageHandler} className={currentPage === 0 ? "disabled" : ""}>
        <PagingArrow />
      </button>
      {visiblePageNumbers.map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "active" : ""}
          key={pageNumber}
          onClick={(event) => pageChangeHandler(event, pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}
      {totalPages - currentPage > 1 && (
        <button onClick={nextPageHandler} className={currentPage === totalPages ? "disabled" : ""}>
          <PagingArrow className="rotate" />
        </button>
      )}
    </StyledPagination>
  );
};

export default Pagination;
