package main.wonprice.domain.member.dto;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationPostDto {

    private Long memberId;

    private String content;
}
