package main.wonprice.domain.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.product.entity.ProductStatus;

import java.time.LocalDateTime;

// 상품 등록을 위한 응답 객체
@Getter @Setter
@Builder
public class ProductResponseDto {
    private Long productId;

    private Long memberId;

    private String title;

    private String description;

    private Long immediatelyBuyPrice; // 즉시 구매가

    private ProductStatus productStatus; // 상품 상태

    private Long views;

    private LocalDateTime createAt;

    private LocalDateTime modifiedAt;

    private LocalDateTime deletedAt;
}
