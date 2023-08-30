package main.wonprice.auth.service;

import main.wonprice.auth.entity.RefreshToken;
import main.wonprice.auth.jwt.JwtTokenizer;
import main.wonprice.auth.repository.RefreshTokenRepository;
import main.wonprice.domain.member.entity.Member;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, JwtTokenizer jwtTokenizer) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    public RefreshToken saveRefreshToken(Member member, String stringToken) {

        refreshTokenRepository.save(new RefreshToken(member, stringToken));

        return new RefreshToken();
    }

    public String generateNewAccessToken(HttpServletRequest request) {

        String refreshToken = request.getHeader("Refresh");

//        refresh 토큰 유효시간 확인
        Date refreshExpiration = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey())).getBody().getExpiration();
        boolean valid = refreshExpiration.before(Calendar.getInstance().getTime());

        if (refreshToken == null || !valid) throw new RuntimeException("Invalid Access");

        Member member = refreshTokenRepository.findByToken(refreshToken).getMember();

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }
}
