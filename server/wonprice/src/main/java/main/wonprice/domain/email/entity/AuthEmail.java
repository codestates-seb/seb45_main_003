package main.wonprice.domain.email.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
public class AuthEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emailId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String authCode;

    @Column(nullable = false)
    private Boolean authenticated = false;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public AuthEmail(String email, String authCode) {
        this.email = email;
        this.authCode = authCode;
    }
}
