package main.wonprice.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.product.dto.ProductResponseDto;

import java.time.LocalDateTime;

@Getter @Setter
public class WishResponseDto {

    private Long wishId;

    private LocalDateTime createdAt;

    private Long productId;

    private ProductResponseDto productResponseDto;
}
