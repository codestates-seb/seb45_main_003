package main.wonprice.domain.product.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;

    private Long productId;

    private Long price;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
