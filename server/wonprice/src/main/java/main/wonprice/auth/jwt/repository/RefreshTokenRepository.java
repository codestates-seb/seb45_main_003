package main.wonprice.auth.jwt.repository;

import main.wonprice.auth.jwt.entity.RefreshToken;
import main.wonprice.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByMemberMemberId(Long memberId);

    Optional<RefreshToken> findByMember(Member member);

    void deleteByTokenId(Long tokenId);
}
