package main.wonprice.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class NotificationCountDto {

    private Long newNotification;
}
