package main.wonprice.domain.member.mapper;

import main.wonprice.domain.member.dto.NotificationPostDto;
import main.wonprice.domain.member.dto.NotificationResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Notification;
import main.wonprice.domain.member.entity.NotificationType;
import main.wonprice.domain.member.entity.Review;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    default NotificationResponseDto notificationToResponseDto(Notification notification) {
        return NotificationResponseDto.builder()
                .notificationId(notification.getNotificationId())
                .content(notification.getContent())
                .notificationType(notification.getNotificationType())
                .cratedAt(notification.getCreatedAt())
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
}
