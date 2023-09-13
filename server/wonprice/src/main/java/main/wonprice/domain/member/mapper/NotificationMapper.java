package main.wonprice.domain.member.mapper;

import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.member.dto.NotificationPostDto;
import main.wonprice.domain.member.dto.NotificationResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Notification;
import main.wonprice.domain.member.entity.NotificationType;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.product.entity.Product;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

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

    default NotificationResponseDto notificationToResponseDto(Notification notification, Product product) {
        return NotificationResponseDto.builder()
                .notificationId(notification.getNotificationId())
                .content(notification.getContent())
                .notificationType(notification.getNotificationType())
                .createdAt(notification.getCreatedAt())
                .isRead(notification.getIsRead())
                .referenceId(notification.getReferenceId())
                .categoryId(product.getCategory().getCategoryId())
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
        Notification notification1 =
                Notification.builder()
                        .content(product.getTitle() + "에 대한 채팅방이 열렸습니다.")
                        .notificationType(NotificationType.CHATTING)
                        .referenceId(chatRoom.getChatRoomId())
                        .createdAt(LocalDateTime.now())
                        .isRead(false)
                        .member(chatRoom.getChatParticipantList().get(0).getMember())
                        .build();

        Notification notification2 =
                Notification.builder()
                        .content(product.getTitle() + "에 대한 채팅방이 열렸습니다.")
                        .notificationType(NotificationType.CHATTING)
                        .referenceId(chatRoom.getChatRoomId())
                        .createdAt(LocalDateTime.now())
                        .isRead(false)
                        .member(chatRoom.getChatParticipantList().get(1).getMember())
                        .build();

        return List.of(notification1, notification2);
    }
}
