package main.wonprice.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.service.ChatService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import main.wonprice.domain.product.service.ProductServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductScheduler {

    private final ProductServiceImpl productService;
    private final MemberService memberService;
    private final ChatService chatService;

    /* buyer가 없으면 STATUS = AFTER 즉 상품 거래 완료 */
    @Scheduled(fixedDelay = 5000)
    @Transactional
    public void createChatRoom() {
//        log.info("이거 5초마다 찍혀 ?");

        List<Product> completedAuction = productService.getCompletedAuction();

        if (!completedAuction.isEmpty()) {
            completedAuction.stream()
                    .forEach(product -> {
                        if (product.getBuyerId() != null) {
                            Member seller = product.getSeller();
                            Member buyer = memberService.findMember(product.getBuyerId());

                            Long chatRoomId = chatService.createChatRoom(product.getProductId());

                            chatService.insertChatParticipant(chatRoomId, seller);
                            chatService.insertChatParticipant(chatRoomId, buyer);

                            product.setStatus(ProductStatus.TRADE);
                        } else {
                            product.setStatus(ProductStatus.AFTER);
                        }
                    });



        }
    }
}
