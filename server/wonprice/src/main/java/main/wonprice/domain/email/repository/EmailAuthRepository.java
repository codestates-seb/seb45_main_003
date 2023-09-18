package main.wonprice.domain.email.repository;

import main.wonprice.domain.email.entity.AuthEmail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<AuthEmail, Long> {

    Optional<AuthEmail> findByEmail(String email);

    void deleteByEmail(String email);

    void deleteAllByCreatedAtIsBefore(LocalDateTime now);
}
