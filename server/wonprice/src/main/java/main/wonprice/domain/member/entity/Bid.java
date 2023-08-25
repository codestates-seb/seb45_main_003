package main.wonprice.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @Setter
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;

    private Long productId;

    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
