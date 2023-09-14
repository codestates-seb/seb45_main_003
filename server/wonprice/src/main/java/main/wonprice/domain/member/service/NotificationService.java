package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.member.entity.Notification;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.mapper.NotificationMapper;
import main.wonprice.domain.member.repository.NotificationRepository;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.service.ProductService;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
@Transactional
public class NotificationService {

    private final MemberService memberService;
    private final ProductService productService;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper mapper;

    public Notification saveNotification(Notification notification) {

        return notificationRepository.save(notification);
    }

//    안읽은 알림 개수
    public Long getUnreadCount() {

        Long count = notificationRepository.countByMemberAndIsRead(memberService.findLoginMember(), false);

        return count;
    }

//    알림 목록
    public Page<Notification> findNotifications(Pageable pageable) {

        return notificationRepository.findByMemberAndDeletedAt(memberService.findLoginMember(), null, pageable);
    }

//    단일 알림 읽음 표시
    public void setReadTrue(Long notificationId) {

        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);

        if (optionalNotification.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOTIFICATION_NOT_FOUND);
        }

        Notification notification = optionalNotification.get();
        memberService.validateOwner(notification.getMember().getMemberId());
        notification.setIsRead(true);
    }

//    모든 알림 읽음 표시
    public void setReadsTrue() {

        notificationRepository.findAllByMember(memberService.findLoginMember())
                .forEach(notification -> notification.setIsRead(true));
    }

//    읽은 리뷰 삭제
    public void deleteNotifications() {

        notificationRepository.findAllByMemberAndIsRead(memberService.findLoginMember(), true)
                .forEach(notification -> notification.setDeletedAt(LocalDateTime.now()));
    }

//    리뷰를 받았을 때 알림 생성
    public Notification createNotification(Review review) {

        Notification notification = mapper.reviewToNotification(review);
        notificationRepository.save(notification);

        return notification;
    }

    public Notification createNotification(Product product) {
        return null;
    }

    //    채팅방 생성 되었을 때 알림 생성
    public List<Notification> createNotification(ChatRoom chatRoom) {

        Product product = productService.findOneById(chatRoom.getProductId());
        List<Notification> notifications = mapper.chatRoomToNotification(chatRoom, product);
        return notificationRepository.saveAll(notifications);
    }

}
