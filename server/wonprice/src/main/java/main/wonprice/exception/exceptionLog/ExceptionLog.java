package main.wonprice.exception.exceptionLog;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter @Getter
@NoArgsConstructor
public class ExceptionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    private String exception;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime created_at = LocalDateTime.now();

    public ExceptionLog(String exception, String message) {
        this.exception = exception;
        this.message = message;
    }
}
