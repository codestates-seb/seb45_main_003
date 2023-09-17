package main.wonprice.domain.chat.dto.message;

import lombok.Getter;
import main.wonprice.domain.chat.entity.Message;

import java.time.LocalDateTime;

@Getter
public class MessageResponseDto {
    private Long messageId;
    private Long senderId;
    private String content;
    private LocalDateTime createdAt;
    private Integer currentParticipants;

    public MessageResponseDto(Message message, Integer currentParticipants) {
        this.messageId = message.getMessageId();
        this.senderId = message.getSenderId();
        this.content = message.getContent();
        this.createdAt = message.getCreatedAt();
        this.currentParticipants = currentParticipants;
    }
}
