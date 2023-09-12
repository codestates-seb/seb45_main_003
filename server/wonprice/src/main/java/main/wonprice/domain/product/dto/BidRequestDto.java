package main.wonprice.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BidRequestDto {

    private Long memberId;

    private Long currentAuctionPrice;

}
