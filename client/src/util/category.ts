import { CATEGORY } from "../constants/category";

export const findCategory = (id: number) => {
  for (const key in CATEGORY) {
    if (CATEGORY[key].id === id) {
      return key;
    }
  }
  return null; // 해당 id와 일치하는 키를 찾지 못한 경우
};
