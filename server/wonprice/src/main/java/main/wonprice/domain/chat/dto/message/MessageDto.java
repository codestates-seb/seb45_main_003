package main.wonprice.domain.chat.dto.message;

import lombok.Getter;
import main.wonprice.domain.chat.entity.Message;

import java.time.LocalDateTime;

@Getter
public class MessageDto {

    private Long messageId;
    private Long senderId;
    private String content;
    private LocalDateTime createdAt = LocalDateTime.now();

    public MessageDto(Message o) {
        this.messageId = o.getMessageId();
        this.senderId = o.getSenderId();
        this.content = o.getContent();
        this.createdAt = o.getCreatedAt();
    }
}
