package main.wonprice.domain.email.controller;

import main.wonprice.domain.email.dto.EmailAuthDto;
import main.wonprice.domain.email.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("email/auth")
    public ResponseEntity authenticateEmail(@RequestBody @Valid EmailAuthDto emailDto) throws MessagingException, UnsupportedEncodingException {
        String authCode = emailService.sendEmail(emailDto.getEmail());

        return new ResponseEntity(authCode, HttpStatus.OK);
    }
}
