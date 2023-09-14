export type CategoryType = {
  [key: string]: {
    id: number;
    value: string;
    path: string;
  };
};

export const CATEGORY: CategoryType = {
  all: {
    id: 0,
    value: "전체 상품",
    path: "/all?page=1",
  },
  clothing: {
    id: 1,
    value: "의류",
    path: "/clothing?page=1",
  },
  electronics: {
    id: 2,
    value: "전자제품",
    path: "/electronics?page=1",
  },
  cosmetic: {
    id: 3,
    value: "뷰티",
    path: "/cosmetic?page=1",
  },
  food: {
    id: 4,
    value: "식품",
    path: "/food?page=1",
  },
  books: {
    id: 5,
    value: "도서",
    path: "/books?page=1",
  },
};
