package main.wonprice.domain.member.mapper;

import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.member.dto.NotificationPostDto;
import main.wonprice.domain.member.dto.NotificationResponseDto;
import main.wonprice.domain.member.entity.*;
import main.wonprice.domain.product.entity.Product;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

//    product 제외 responseDto
    default NotificationResponseDto notificationToResponseDto(Notification notification) {
        return NotificationResponseDto.builder()
                .notificationId(notification.getNotificationId())
                .content(notification.getContent())
                .notificationType(notification.getNotificationType())
                .createdAt(notification.getCreatedAt())
                .isRead(notification.getIsRead())
                .referenceId(notification.getReferenceId())
                .build();
    }

    default Notification reviewToNotification(Review review) {
        return Notification.builder()
                .content(review.getProduct().getTitle() + "에 대한 리뷰가 도착했습니다")
                .notificationType(NotificationType.REVIEW)
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .referenceId(review.getReviewId())
                .member(review.getReceiveMember())
                .build();
    }

    default Notification postDtoToNotification(NotificationPostDto postDto, Member receiveMember) {
        return Notification.builder()
                .content(postDto.getContent())
                .notificationType(NotificationType.ADMIN)
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .member(receiveMember)
                .build();
    }

    default List<Notification> chatRoomToNotification(ChatRoom chatRoom, Product product) {

        List<Notification> notifications = new ArrayList<>();

        for (ChatParticipant participant : chatRoom.getChatParticipantList()) {

            notifications.add(
                    Notification.builder()
                            .content(product.getTitle() + "에 대한 채팅방이 열렸습니다.")
                            .notificationType(NotificationType.CHATTING)
                            .referenceId(chatRoom.getChatRoomId())
                            .createdAt(LocalDateTime.now())
                            .isRead(false)
                            .member(participant.getMember())
                            .build()
            );
        }

        return notifications;
    }

//    찜 했던 상품 정보 수정 시 알림 생성
    default List<Notification> wishProductToNotification(Product product) {

        List<Notification> notifications = new ArrayList<>();

        for (Wish wish : product.getWishes()) {

            notifications.add(
                    Notification.builder()
                            .notificationType(NotificationType.PRODUCT)
                            .referenceId(product.getProductId())
                            .createdAt(LocalDateTime.now())
                            .isRead(false)
                            .member(wish.getMember()).build()
            );
        }

        return notifications;
    }
}
