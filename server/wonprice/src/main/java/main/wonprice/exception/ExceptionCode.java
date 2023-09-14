package main.wonprice.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_NAME_EXISTS(409, "Member Name exists"),
    MEMBER_EMAIL_EXISTS(409, "Member Email exists"),
    MEMBER_PHONE_EXISTS(409, "Member Phone exists"),
    MEMBER_NOT_AUTHENTICATED(401, "Member not Authenticated"),
    MEMBER_NOT_AUTHORIZED(403, "Member not Authorized"),
    ACCESS_TOKEN_EXPIRED(401, "Access Token Expired"),
    REFRESH_TOKEN_EXPIRED(401, "Refresh Token Expired"),
    INVALID_TOKEN(406, "Invalid Token"),
    INVALID_PASSWORD(403, "Invalid Password"),
    WISH_NOT_FOUND(404, "Wish not found"),
    WISH_ALREADY_EXISTS(409, "Wish already exists"),
    CANNOT_ADD_YOUR_WISH(403, "Can't add your Wish"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    REVIEW_EXISTS(409, "Review exists"),
    NOTIFICATION_NOT_FOUND(404, "Notification not found"),
    FORBIDDEN_REQUEST(403, "Forbidden"),

    // Category
    CATEGORY_NOT_FOUND(404, "Category not found"),

    // Product
    // 상품 등록
    PRODUCT_INVALID_PRICE(400, "상품의 등록 가격은 10억을 넘을 수 없습니다."),
    PRODUCT_AUCTION_IMMEDIATELY_CURRENT_INVALID_PRICE(400, "경매하려는 상품의 시작가는 즉시 구매가와 같거나 높은 가격일 수 없습니다."),

    SELLER_AND_BUYER_ARE_SAME(400, "Seller and Buyer can NOT be the SAME."),
    INVALID_BID_PRICE_1(400, "제시하려는 입찰가는 현재 상품의 입찰가보다 낮은 가격일 수 없습니다."),
    INVALID_BID_PRICE_2(400, "제시하려는 입찰가는 현재 상품의 입찰가의 5% 이상이어야 합니다."),
    INVALID_BID_PRICE_NULL_BUYER(400, "입찰자가 없을 경우에는 입찰가");

    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
