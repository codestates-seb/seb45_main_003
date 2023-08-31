package main.wonprice.auth.refreshToken.repository;

import main.wonprice.auth.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);

    void deleteByToken(String token);
}
