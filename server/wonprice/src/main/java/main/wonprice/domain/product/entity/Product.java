package main.wonprice.domain.product.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
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

    private Boolean auction = false;

    private LocalDateTime createAt;

    private LocalDateTime deletedAt;

    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.BEFORE;

    private Long views;

    private LocalDateTime closedAt;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member seller;

    // 연관관계 편의 메서드
    public void addProduct(Member seller) {
        this.seller = seller;
        seller.getProducts().add(this);
    }
}
