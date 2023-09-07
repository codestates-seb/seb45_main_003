export type CategoryType = {
  [key: string]: {
    id: number;
    value: string;
  };
};

export const CATEGORY: CategoryType = {
  clothing: {
    id: 1,
    value: "의류",
  },
  electronics: {
    id: 2,
    value: "전자제품",
  },
  cosmetic: {
    id: 3,
    value: "뷰티",
  },
  food: {
    id: 4,
    value: "식품",
  },
  books: {
    id: 5,
    value: "도서",
  },
};
