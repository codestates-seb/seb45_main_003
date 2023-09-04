export const REQUIRED = {
  images: "이미지 등록은 필수입니다.",
  title: "제목은 필수입니다.",
  description: "상품 설명은 필수입니다.",
  currentAuctionPrice: "경매 시작가는 필수입니다.",
  immediatelyBuyPrice: "즉시 구매가는 필수입니다.",
  closingDate: "경매 종료 날짜는 필수입니다.",
  closingTime: "경매 종료 시간은 필수입니다.",
  review: "후기 내용은 필수입니다.",
};

export const SUCCESS = {
  post: "상품 등록이 완료되었습니다.",
  review: "후기 작성이 완료되었습니다.",
};

export const FAIL = {
  post: "상품 등록에 실패하였습니다.",
  review: "후기 작성에 실패하였습니다.",
};

export const MAX = {
  imageSelect: (max: number) => `이미지는 최대 ${max}장까지 선택 가능합니다.`,
};
