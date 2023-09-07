export type CategoryType = {
  [key: string]: string; // 인덱스 시그니처 추가
};

export const CATEGORY: CategoryType = {
  clothing: "의류",
  electronics: "전자제품",
  beauty: "뷰티",
  food: "식품",
  books: "도서",
};
