package main.wonprice.domain.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.product.entity.ProductStatus;

import java.time.LocalDateTime;

// 상품 등록을 위한 응답 객체
@Getter @Setter
public class ProductMypageResponseDto {
    private Long productId;

    private String title;

    private Long immediatelyBuyPrice;

    private Long currentAuctionPrice;

    private ProductStatus productStatus;

    private Long views;

    private LocalDateTime createAt;

    private LocalDateTime modifiedAt;

    private LocalDateTime closedAt;
}
