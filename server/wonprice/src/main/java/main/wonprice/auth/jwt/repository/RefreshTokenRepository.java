package main.wonprice.auth.jwt.repository;

import main.wonprice.auth.jwt.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByMemberMemberId(Long memberId);

    void deleteByTokenId(Long tokenId);
}
