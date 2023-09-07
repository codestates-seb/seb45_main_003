package main.wonprice.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class WishResponseDto {

    private Long wishId;

    private LocalDateTime createdAt;

    private Long productId;
}
