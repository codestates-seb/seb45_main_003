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

    private Long buyerId;

    private String title;

    @Lob
    private String description;

    private Long immediatelyBuyPrice;

    private Long currentAuctionPrice;

    private Boolean auction;

    private LocalDateTime createAt;

    private LocalDateTime deletedAt;

    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private Long views;

    private LocalDateTime closedAt;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member seller;

    @Builder
    public Product(Member seller, String title, String description, Long immediatelyBuyPrice) {
        this.seller = seller;
        this.title = title;
        this.description = description;
        this.immediatelyBuyPrice = immediatelyBuyPrice;
    }

    // 상품 정보 등록 날짜 갱신 메서드
    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    // 상품 정보 수정 날짜 갱신 메서드
    @PreUpdate
    public void preUpdate() {
        modifiedAt = LocalDateTime.now();
    }
}
