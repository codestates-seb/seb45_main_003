package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.dto.BidResponseDto;
import main.wonprice.domain.product.dto.BidRequestDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.service.ProductService;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BidController {

    private final ProductService productService;
    private final MemberService memberService;

    @MessageMapping("/bid/{productId}")
    @SendTo("/topic/bid/{productId}")
    public ResponseEntity sendBid(@DestinationVariable("productId") Long productId, @RequestBody BidRequestDto request) {
        Product product = productService.updateCurrentAuctionPrice(productId, request.getCurrentAuctionPrice(), request.getMemberId());

        // 판매자와 입찰자가 같을 경우 예외 처리
        if (product.getSeller().getMemberId() == request.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.SELLER_AND_BUYER_ARE_SAME);
        }

        Member member = memberService.getMemberById(product.getBuyerId());

        BidResponseDto bidResponseDto = new BidResponseDto();
        bidResponseDto.setProductId(product.getProductId());
        bidResponseDto.setCurrentAuctionPrice(product.getCurrentAuctionPrice());
        bidResponseDto.setName(member.getName());

        return new ResponseEntity(bidResponseDto, HttpStatus.OK);
    }
}
