package main.wonprice.domain.email.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
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

    public String sendEmail(String email) throws MessagingException, UnsupportedEncodingException {

        String authCode = generateRandomCode();
        String title = "WonPrice 회원가입 이메일 인증";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);
        message.setFrom(emailFrom);

        String text = "";
        text += "<div style='margin:20px;'>";
        text += "<h1> 안녕하세요 WonPrice 입니다. </h1>";
        text += "<br>";
        text += "<p>아래 코드를 복사해 입력해 주세요<p>";
        text += "<br>";
        text += "<p>감사합니다.<p>";
        text += "<br>";
        text += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        text += "<h3 style='color:blue;'>이메일 인증 코드입니다.</h3>";
        text += "<div style='font-size:130%'>";
        text += "CODE : <strong>";
        text += authCode + "</strong><div><br/> ";
        text += "</div>";

        message.setText(text, "utf-8", "html");

        emailSender.send(message);

        return authCode;
    }
}
