package main.wonprice.domain.product.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

// 상품 등록을 위한 요청 객체
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProductRequestDto {
    private String title; // 제목

    private String description; // 상품 설명

    private Long immediatelyBuyPrice; // 즉시 구매가

    private Long currentAuctionPrice; // 시작가 --> 현재 입찰가

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime closedAt; // 경매 종료 시간

    private Boolean auction; // 판매 방식 (경매:true or 즉시 구매:false)
}