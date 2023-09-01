package main.wonprice.auth.refreshToken.repository;

import main.wonprice.auth.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);

    RefreshToken findByMemberMemberId(Long memberId);

    void deleteByToken(String token);

    void deleteByTokenId(Long tokenId);
}
