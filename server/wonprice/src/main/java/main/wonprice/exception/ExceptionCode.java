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
    INVALID_PASSWORD(403, "Invalid Password"),
    WISH_NOT_FOUND(404, "Wish not found"),
    REVIEW_NOT_FOUND(404, "Review not found");

    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
