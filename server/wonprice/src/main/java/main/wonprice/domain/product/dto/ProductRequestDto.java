package main.wonprice.domain.product.dto;

import lombok.*;

// 상품 등록을 위한 요청 객체
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProductRequestDto {

    private String title; // 상품 이름

    private String description; // 상품 정보

    private Long immediatelyBuyPrice; // 즉시 구매가

    private Boolean auction; // 경매 여부
}