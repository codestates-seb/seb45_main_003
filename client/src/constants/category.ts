export type CategoryType = {
  [key: string]: {
    id: number;
    value: string;
    path: string;
  };
};

export const CATEGORY: CategoryType = {
  clothing: {
    id: 1,
    value: "의류",
    path: "/product/clothing",
  },
  electronics: {
    id: 2,
    value: "전자제품",
    path: "/product/electronics",
  },
  cosmetic: {
    id: 3,
    value: "뷰티",
    path: "/product/cosmetic",
  },
  food: {
    id: 4,
    value: "식품",
    path: "/product/food",
  },
  books: {
    id: 5,
    value: "도서",
    path: "/product/books",
  },
};
