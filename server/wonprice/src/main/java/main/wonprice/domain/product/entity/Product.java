package main.wonprice.domain.product.entity;

import lombok.*;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.picture.entity.ProductPicture;
import main.wonprice.domain.product.dto.ProductRequestDto;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private Long buyerId; // 구매자 , 즉시 구매를 눌렀을 때 / 입찰을 눌렀을 때

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

    private Boolean sellerReview; // 판매자 리뷰 작성 여부

    private Boolean buyerReview; // 구매자 리뷰 작성 여부

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category; // 카테고리

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member seller; // 판매자

    @OneToMany(mappedBy = "product")
    private List<Review> reviews = new ArrayList<>(); // 리뷰

    @OneToMany(mappedBy = "product")
    private List<ProductPicture> productPictures = new ArrayList<>(); // 게시글 이미지

    @OneToMany(mappedBy = "product")
    private List<Wish> wishes = new ArrayList<>();

    private Integer wishCount = 0;

    public Product update(ProductRequestDto productRequestDto) {
        this.title = productRequestDto.getTitle();
        this.description = productRequestDto.getDescription();
        return this;
    }
}
