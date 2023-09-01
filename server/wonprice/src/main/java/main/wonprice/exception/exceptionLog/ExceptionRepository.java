package main.wonprice.exception.exceptionLog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExceptionRepository extends JpaRepository<ExceptionLog, Long> {
}
