package main.wonprice.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import main.wonprice.domain.product.dto.ProductResponseDto;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishResponseDto {

    private Long wishId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

    private Long productId;

    private ProductResponseDto productResponseDto;
}
