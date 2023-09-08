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

    private String title;

    private String description;

    private Long immediatelyBuyPrice;

    private ProductStatus productStatus;

    private Long views;

    private Boolean auction;

    private Long categoryId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createAt;

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
}
