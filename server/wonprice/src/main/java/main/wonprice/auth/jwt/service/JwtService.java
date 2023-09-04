package main.wonprice.auth.jwt.service;

import main.wonprice.auth.jwt.entity.RefreshToken;
import main.wonprice.auth.jwt.JwtTokenizer;
import main.wonprice.auth.jwt.repository.RefreshTokenRepository;
import main.wonprice.domain.member.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class JwtService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;

    public JwtService(RefreshTokenRepository refreshTokenRepository, JwtTokenizer jwtTokenizer) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    public RefreshToken saveRefreshToken(Member member, String stringToken) {

        RefreshToken findToken = refreshTokenRepository.findByMemberMemberId(member.getMemberId());

        if (findToken != null) {
            refreshTokenRepository.deleteByTokenId(findToken.getTokenId());
        }
        refreshTokenRepository.save(new RefreshToken(member, stringToken));

        return new RefreshToken();
    }

    public String generateNewAccessToken(HttpServletRequest request) {

        String refreshToken = request.getHeader("Refresh");

//        refresh 토큰 유효시간 확인
        Date refreshExpiration = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey())).getBody().getExpiration();
        boolean valid = refreshExpiration.after(Calendar.getInstance().getTime());

        if (refreshToken == null || !valid) throw new RuntimeException("Invalid Access");
        if (!valid) refreshTokenRepository.deleteByToken(refreshToken);

        Member member = refreshTokenRepository.findByToken(refreshToken).getMember();

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    public void verifyAccessToken(HttpServletRequest request) {

        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        /* JWT에서 Claims를 parsing 할 수 있다 -> 내부적으로 Signature 검증에 성공했다 */
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }
}
