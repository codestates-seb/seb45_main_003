package main.wonprice.domain.member.dto;

import lombok.*;
import main.wonprice.domain.product.dto.ProductResponseDto;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishResponseDto {

    private Long wishId;

    private LocalDateTime createdAt;

    private Long productId;

    private ProductResponseDto productResponseDto;
}
