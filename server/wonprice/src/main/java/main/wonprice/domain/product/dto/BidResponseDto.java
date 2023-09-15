package main.wonprice.domain.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidResponseDto {

    private Long productId;

    private Long currentAuctionPrice;

    private String name;
    private Long buyerId;

}
