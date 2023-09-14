package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.member.service.NotificationService;
import main.wonprice.domain.product.entity.Bid;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.dto.BidResponseDto;
import main.wonprice.domain.product.dto.BidRequestDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.BidRepository;
import main.wonprice.domain.product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BidController {

    private final ProductService productService;
    private final MemberService memberService;
    private final BidRepository bidRepository;
    private final NotificationService notificationService;

    @MessageMapping("/bid/{productId}")
    @SendTo("/topic/bid/{productId}")
    public ResponseEntity sendBid(@DestinationVariable("productId") Long productId, @RequestBody BidRequestDto request) {
        Product product = productService.updateCurrentAuctionPrice(productId, request);

        Member member = memberService.getMemberById(product.getBuyerId());

        // 기존의 입찰을 시도했던 회원인지 확인
        Bid existsedBid = bidRepository.findByProductProductIdAndMember(productId, member);
        LocalDateTime now = LocalDateTime.now();

        if (existsedBid != null) {
            // 회원 기준으로 기존 레코드가 존재하는 경우 업데이트
            existsedBid.setCreatedAt(LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute()));
            existsedBid.setPrice(request.getCurrentAuctionPrice());

            notificationService.createNotificationWithBid(bidRepository.save(existsedBid));
        } else {
            // 회원 기준으로 기존 레코드가 없는 경우 새로운 레코드 생성
            Bid bid = new Bid();
            bid.setProduct(product);
            bid.setCreatedAt(LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute()));
            bid.setPrice(request.getCurrentAuctionPrice());
            bid.setMember(member);
            notificationService.createNotificationWithBid(bidRepository.save(bid));
        }

        BidResponseDto bidResponseDto = new BidResponseDto();
        bidResponseDto.setProductId(product.getProductId());
        bidResponseDto.setCurrentAuctionPrice(product.getCurrentAuctionPrice());
        bidResponseDto.setName(member.getName());
        bidResponseDto.setBuyerId(product.getBuyerId());

        return new ResponseEntity(bidResponseDto, HttpStatus.OK);
    }
}
