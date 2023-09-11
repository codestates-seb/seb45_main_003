import moment from "moment";

export const useCurrentTime = () => {
  return moment().format("YYYY년 MM월 DD일 a hh시 mm분");
};
