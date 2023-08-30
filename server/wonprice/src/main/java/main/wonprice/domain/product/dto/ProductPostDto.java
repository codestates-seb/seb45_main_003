package main.wonprice.domain.product.dto;

import lombok.*;

@Getter @Setter
public class ProductPostDto {
    private String title;

    private String description;

    private Long immediatelyBuyPrice; // 즉시 구매가
}