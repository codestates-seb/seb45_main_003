package main.wonprice.domain.email.controller;

import main.wonprice.domain.email.dto.EmailAuthDto;
import main.wonprice.domain.email.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
public class EmailController {

    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public EmailController(EmailService emailService, TemplateEngine templateEngine) {
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    @PostMapping("email/auth")
    public ResponseEntity authenticateEmail(@RequestBody @Valid EmailAuthDto emailDto) throws MessagingException, UnsupportedEncodingException {

        String authCode = emailService.generateRandomCode();

        Context context = new Context();
        context.setVariable("email", emailDto.getEmail());
        context.setVariable("authCode", authCode);

        String message = templateEngine.process("email-auth", context);

        emailService.sendEmail(emailDto.getEmail(), message);

        return new ResponseEntity(authCode, HttpStatus.OK);
    }
}
