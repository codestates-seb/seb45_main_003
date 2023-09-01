package main.wonprice.auth.refreshToken.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.wonprice.domain.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column
    private String token;

    public RefreshToken(Member member, String token) {
        this.member = member;
        this.token = token;
    }
}
