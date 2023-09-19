package main.wonprice.domain.email.controller;

import main.wonprice.domain.email.dto.EmailAuthDto;
import main.wonprice.domain.email.entity.AuthEmail;
import main.wonprice.domain.email.mapper.EmailMapper;
import main.wonprice.domain.email.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final EmailMapper mapper;

    public EmailController(EmailService emailService, EmailMapper mapper) {
        this.emailService = emailService;
        this.mapper = mapper;
    }

    @PostMapping("/auth/send")
    public ResponseEntity sendAuthEmail(@RequestBody @Valid EmailAuthDto emailDto) throws MessagingException, UnsupportedEncodingException {

        AuthEmail email = mapper.authDtoToEmail(emailDto);

        emailService.sendAuthEmail(email);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity veriftyAuthCode(@RequestBody @Valid EmailAuthDto emailDto) throws MessagingException, UnsupportedEncodingException {

        AuthEmail email = mapper.authDtoToEmail(emailDto);

        boolean result = emailService.verifyAuthCode(email);

        return result
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }
}
