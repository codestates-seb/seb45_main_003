package main.wonprice.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.NotificationType;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
public class NotificationResponseDto {

    private Long notificationId;

    private String content;

    private NotificationType notificationType;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

    private Boolean isRead;

    private Long referenceId;

    private Long categoryId;
}
