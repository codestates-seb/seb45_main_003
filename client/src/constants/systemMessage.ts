export const REQUIRED = {
  images: "이미지 등록은 필수입니다.",
  title: "제목은 필수입니다.",
  category: "카테고리 선택은 필수입니다.",
  description: "상품 설명은 필수입니다.",
  currentAuctionPrice: "경매 시작가는 필수입니다.",
  immediatelyBuyPrice: "즉시 구매가는 필수입니다.",
  closingDate: "경매 종료 날짜는 필수입니다.",
  closingTime: "경매 종료 시간은 필수입니다.",
  review: "후기 내용은 필수입니다.",
  bid: "입찰 가격을 입력해주세요.",
  reputation: "평점을 입력해주세요.",
};

export const CONFIRM = {
  delete: "상품을 삭제하시겠습니까?",
  bid: "즉시구매가와 같은 가격으로 입찰할경우 경매가 종료되고 상품의 구매자가 됩니다.",
  buyItNow: "상품을 즉시 구매가에 구매하시겠습니까?",
};

export const SUCCESS = {
  post: "상품 등록이 완료되었습니다.",
  review: "후기 작성이 완료되었습니다.",
  update: "상품 수정이 완료되었습니다.",
  addWishlist: "찜 목록에 상품이 추가되었습니다.",
  removeWishlist: "찜 목록에서 상품을 삭제했습니다",
  delete: "상품을 삭제하였습니다.",
  bid: "상품을 입찰하였습니다.",
  buyItNow: "상품을 즉시구매가에 구매하였습니다.",
};

export const FAIL = {
  post: "상품 등록에 실패했습니다.",
  review: "후기 작성에 실패했습니다.",
  update: "상품 수정에 실패했습니다.",
  addWishlist: "상품을 찜 목록에 추가하지 못했습니다.",
  removeWishlist: "상품을 찜 목록에서 삭제할 수 없습니다.",
  delete: "상품 삭제에 실패했습니다.",
  bid: "입찰에 실패했습니다.",
  buyItNow: "즉시 구매에 실패했습니다.",
  edit: {
    before: "입찰자가 있는 상품은 수정할 수 없습니다.",
    trade: "구매자와 채팅중인 상품은 수정할 수 없습니다.",
    after: "거래가 완료된 상품은 수정할 수 없습니다.",
  },
};

export const MAX = {
  imageSelect: (max: number) => `이미지는 최대 ${max}장까지 선택 가능합니다.`,
  bid: `즉시구매가를 초과하여 입찰할 수 없습니다.`,
};

export const MIN = {
  bid: (min: number) => `현재 입찰가의 ${min}% 이상 금액부터 입찰할 수 있습니다.`,
};

export const AUCTION = {
  bid: "입찰가를 입력해 주세요.",
  isnot: "즉시 구매만 가능한 상품입니다.",
  end: "거래가 종료된 상품입니다.",
};
