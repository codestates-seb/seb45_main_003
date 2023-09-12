package main.wonprice.auth.jwt.service;

import lombok.AllArgsConstructor;
import main.wonprice.auth.jwt.entity.RefreshToken;
import main.wonprice.auth.jwt.JwtTokenizer;
import main.wonprice.auth.jwt.repository.RefreshTokenRepository;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class JwtService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

//    refresh 토큰 처음 발급 시 DB에 저장
    public RefreshToken saveRefreshToken(Member member, String stringToken) {

        RefreshToken findToken = refreshTokenRepository.findByMemberMemberId(member.getMemberId());

        if (findToken != null) {
            refreshTokenRepository.deleteByTokenId(findToken.getTokenId());
        }
        refreshTokenRepository.save(new RefreshToken(member, stringToken));

        return new RefreshToken();
    }

//    access 토큰 재발급
    public String generateNewAccessToken(HttpServletRequest request) {

        String refreshToken = request.getHeader("Refresh");

//        refresh 토큰 검증
        jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey())).getBody().getExpiration();

        Optional<RefreshToken> findToken = refreshTokenRepository.findByToken(refreshToken);
        if (findToken.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }

        Member member = findToken.get().getMember();

//        새로운 access 토큰 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    /*
    상시 로그인 상태 확인 시 access와 refresh를 같이 보내고 둘다 검증함
    중복 로그인 시 앞서 로그인 한 사람의 refresh 토큰을 삭제

    토큰 만료시 401
    시그니처 오류 시 406
    refresh가 뒤이어 로그인한 사람의 것과 다르거나 없을때 406
    */
    public void verifyToken(HttpServletRequest request) {

        String accessJws = request.getHeader("Authorization").replace("Bearer ", "");
        String requestRefresh = request.getHeader("Refresh");

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        /*
        access 검증
        JWT에서 Claims를 parsing 할 수 있다 -> 내부적으로 Signature 검증에 성공했다
        */
        Map<String, Object> accessClaims = jwtTokenizer.getClaims(accessJws, base64EncodedSecretKey).getBody();
        Member loginMember = memberService.findLoginMember();

//        refresh 검증
        if (!requestRefresh.equals(refreshTokenRepository.findByMemberMemberId(loginMember.getMemberId()).getToken())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
    }
}
