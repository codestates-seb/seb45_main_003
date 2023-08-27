package main.wonprice.domain.email.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;

@Service
public class EmailService {

    private final JavaMailSender emailSender;

    @Value("${ADMIN_EMAIL}")
    private String emailFrom;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
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

    public void sendEmail(String emailTo, String mailText) throws MessagingException, UnsupportedEncodingException {

        String title = "WonPrice 회원가입 이메일 인증";

        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message);

        mimeMessageHelper.setSubject(title);
        mimeMessageHelper.setTo(emailTo);
        mimeMessageHelper.setFrom("WonPrice");
        mimeMessageHelper.setText(mailText, true);

        emailSender.send(message);
    }
}
