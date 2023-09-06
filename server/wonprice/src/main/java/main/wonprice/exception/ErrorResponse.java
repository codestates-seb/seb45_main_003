package main.wonprice.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/*
@NotNull 같은 어노테이션으로 DTO에서 검증에 실패할 경우 FieldError 발생
@검증 어노테이션 사용시 핸들러 메서드에 @Valid 사용해야 함
@검증 어노테이션에서 검증 실패 시 @Valid 검증도 실패하지만 우선적으로 FieldError를 catch
그래서 ConstraintViolationError는 @PathVariable 같은 DTO에서 어노테이션으로 처리 하지 못한 부분들 처리    */

@Getter
public class ErrorResponse {

/*    MethodArgumentNotValidException 에서 발생하는 에러 정보를 담는 변수
    필드에 접근할 때 생기는 오류
    -> DTO 유효성 검증 실패한 에러 정보 */
    private List<FieldError> fieldErrors;

/*    ConstraintViolationException 에서 발생하는 에러 정보를 담는 변수
      DB 제약 조건을 위반한 에러
      -> URI 변수 값의 유효성 검증에 실패한 에러 정보    */
    private List<ConstraintViolationError> violationErrors;

//    BusinessLogic Exception 응답을 위한 필드
    private int status;
    private String message;
    private String exception;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
    private ErrorResponse(int status, String message, String exception) {
        this.status = status;
        this.message = message;
        this.exception = exception;
    }

    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    public static ErrorResponse of(HttpStatus httpStatus, String exceptionName) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase(), exceptionName);
    }

//    BindingResult에 대한 ErrorResponse 객체 생성
    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

//    Set<ConstraintViolation<?>> 객체에 대한 ErrorResponse 객체 생성
    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }
    @Getter
    public static class FieldError {

        private String field;
        private Object rejectedValue;
        private String reason;

        private FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of(BindingResult bindingResult) { // BindingResult : 어노테이션 기반 검증 실패 에러 정보
            List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();

            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null
                                    ? ""
                                    : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {

        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }
//        ConstraintViolation : @Valid 검증 실패 에러 정보
        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {

            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}
