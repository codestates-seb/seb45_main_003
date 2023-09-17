package main.wonprice.domain.email.service;

import main.wonprice.domain.email.entity.AuthEmail;
import main.wonprice.domain.email.repository.EmailAuthRepository;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.Optional;

@Service
@Transactional
public class EmailService {

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;
    private final EmailAuthRepository emailAuthRepository;
    private final MemberService memberService;


    @Value("${ADMIN_EMAIL}")
    private String emailFrom;

    public EmailService(JavaMailSender emailSender, TemplateEngine templateEngine, EmailAuthRepository emailRepository, MemberService memberService) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
        this.emailAuthRepository = emailRepository;
        this.memberService = memberService;
    }

//    인증 코드 랜덤 생성
    public String generateRandomCode() {

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }

        return sb.toString();
    }

    public void sendAuthEmail(AuthEmail email) throws MessagingException, UnsupportedEncodingException {

        String authCode = generateRandomCode();
        String recipient = email.getEmail();

        memberService.checkExistEmail(recipient);

        Optional<AuthEmail> authEmail = emailAuthRepository.findByEmail(recipient);

        if (authEmail.isPresent() && !authEmail.get().getAuthenticated()) {
            emailAuthRepository.deleteByEmail(recipient);
        }

        Context context = new Context();
        context.setVariable("email", recipient);
        context.setVariable("authCode", authCode);

        String message = templateEngine.process("email-auth", context);

        String title = "WonPrice 회원가입 이메일 인증";

        MimeMessage mimeMessage = emailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

        mimeMessageHelper.setSubject(title);
        mimeMessageHelper.setTo(recipient);
        mimeMessageHelper.setFrom("WonPrice");
        mimeMessageHelper.setText(message, true);

        emailAuthRepository.save(new AuthEmail(recipient, authCode));

        emailSender.send(mimeMessage);
    }

    public boolean verifyAuthCode(AuthEmail email) {

        Optional<AuthEmail> findEmail = emailAuthRepository.findByEmail(email.getEmail());

        if (findEmail.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND);
        }

        AuthEmail authEmail = findEmail.get();

        if (authEmail.getAuthCode().equals(email.getAuthCode())) {
            authEmail.setAuthenticated(true);
            return true;
        } else return false;
    }
}
