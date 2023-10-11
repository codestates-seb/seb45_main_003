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
    path: "/category/all?page=1",
  },
  clothing: {
    id: 1,
    value: "의류",
    path: "/category/clothing?page=1",
  },
  electronics: {
    id: 2,
    value: "전자제품",
    path: "/category/electronics?page=1",
  },
  cosmetic: {
    id: 3,
    value: "뷰티",
    path: "/category/cosmetic?page=1",
  },
  food: {
    id: 4,
    value: "식품",
    path: "/category/food?page=1",
  },
  books: {
    id: 5,
    value: "도서",
    path: "/category/books?page=1",
  },
  props: {
    id: 6,
    value: "소품",
    path: "/category/props?page=1",
  },
  etc: {
    id: 7,
    value: "기타",
    path: "/category/etc?page=1",
  },
};
