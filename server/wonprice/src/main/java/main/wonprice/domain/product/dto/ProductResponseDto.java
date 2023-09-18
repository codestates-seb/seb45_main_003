package main.wonprice.domain.product.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.picture.entity.ProductPicture;
import main.wonprice.domain.product.entity.ProductStatus;

import java.time.LocalDateTime;
import java.util.List;

// 상품 등록을 위한 응답 객체
@Getter @Setter
@Builder
public class ProductResponseDto {
    private Long productId;

    private Long memberId;

    private Long buyerId;

    private String title;

    private String description;

    private Long immediatelyBuyPrice;

    private ProductStatus productStatus;

    private Long views;

    private Boolean auction;

    private Long categoryId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifiedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime deletedAt;

    private Long currentAuctionPrice; // 시작가 --> 현재 입찰가

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime closedAt; // 경매 종료 시간

    private List<ProductPicture> images;

    private String sellerName; // 판매자 이름

    private Long sellerReputation; // 판매자 평판

    private int sellerTradeCount; // 판매자 거래 횟수

    private Long sellerWrittenReviewsCount; // 판매자가 작성한 리뷰 개수

    private Long sellerReceivedReviewsCount; // 판매자가 받은 리뷰 개수

    private Long wishCount; // 상품이 받은 총 wish 갯수

    private Boolean loginMembersWish; // 로그인한 회원이 해당 상품을 찜 했는지 여부 / 추후에 DTO 분리할게요

    private Boolean buyerReview;

    private Boolean sellerReview;
    private String path;
}