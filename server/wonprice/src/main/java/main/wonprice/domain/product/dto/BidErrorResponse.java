package main.wonprice.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BidErrorResponse {

    private String message;

    private Long buyerId;
}
