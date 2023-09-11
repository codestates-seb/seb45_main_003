package main.wonprice.domain.chat.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SequenceRequest {
    private Long memberId;
    private Long messageId;
}
