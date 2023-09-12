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
    FORBIDDEN_REQUEST(403, "Forbidden");

    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
