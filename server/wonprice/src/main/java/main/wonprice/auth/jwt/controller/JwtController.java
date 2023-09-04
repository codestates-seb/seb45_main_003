package main.wonprice.auth.jwt.controller;

import lombok.AllArgsConstructor;
import main.wonprice.auth.jwt.JwtTokenizer;
import main.wonprice.auth.jwt.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
public class JwtController {

    private final JwtService jwtService;
    private final JwtTokenizer tokenizer;

    @GetMapping("/refresh")
    public ResponseEntity newAccessToken(HttpServletRequest request) {

        String accessToken = jwtService.generateNewAccessToken(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Authorization", "Bearer " + accessToken)
                .build();
    }

    @GetMapping("/access")
    public ResponseEntity verifyTokenExpiration(HttpServletRequest request) {

        jwtService.verifyAccessToken(request);

        return new ResponseEntity(HttpStatus.OK);
    }
}
