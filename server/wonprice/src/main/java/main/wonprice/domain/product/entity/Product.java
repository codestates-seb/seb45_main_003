package main.wonprice.domain.product.entity;

import lombok.*;
import main.wonprice.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private Long buyerId; // 구매자

    private String title; // 글 제목

    @Lob
    private String description; // 내용

    private Long immediatelyBuyPrice; // 즉시 구매가

    private Long currentAuctionPrice; // 현재 입찰가 (시작가에서 증가되는 방식)

    private Boolean auction; // 경매 여부

    private LocalDateTime createAt; // 거래 시작 시간 (작성시간)

    private LocalDateTime deletedAt; // 글 삭제 시간

    private LocalDateTime modifiedAt; // 글 수정 시간

    @Enumerated(EnumType.STRING)
    private ProductStatus status; // 상품 거래 상태

    private Long views; // 조회수

    private LocalDateTime closedAt; // 경매 종료 시간

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category; // 카테고리

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member seller; // 판매자
}
