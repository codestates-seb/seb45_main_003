package main.wonprice.exception.advice;

import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ErrorResponse;
import main.wonprice.exception.exceptionLog.ExceptionLog;
import main.wonprice.exception.exceptionLog.ExceptionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    private ExceptionRepository repository;

    public GlobalExceptionAdvice(ExceptionRepository repository) {
        this.repository = repository;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        return ErrorResponse.of(e.getBindingResult());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {

        return ErrorResponse.of(e.getConstraintViolations());
    }

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

/*    처리 못한 예외 로그 DB 저장용
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionLog handleException(Exception e) {

        ExceptionLog exceptionLog = new ExceptionLog(e.getClass().getSimpleName(), e.getMessage());

        return repository.save(exceptionLog);
    }
*/
}