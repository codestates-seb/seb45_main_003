package main.wonprice.auth.jwt.repository;

import main.wonprice.auth.jwt.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);

    RefreshToken findByMemberMemberId(Long memberId);

    void deleteByToken(String token);

    void deleteByTokenId(Long tokenId);
}
