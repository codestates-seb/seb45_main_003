package main.wonprice.domain.email.repository;

import main.wonprice.domain.email.entity.AuthEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailAuthRepository extends JpaRepository<AuthEmail, Long> {

    AuthEmail findByEmail(String email);
}
