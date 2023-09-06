package main.wonprice.domain.chat.dto.chat;

import lombok.Getter;
import main.wonprice.domain.chat.entity.Message;

import java.time.LocalDateTime;

@Getter
public class ChatParticipantMessagesDto {

    private Long messageId;
    private String content;
    private LocalDateTime createdAt;

    public ChatParticipantMessagesDto(Message o) {
        this.messageId = o.getMessageId();
        this.content = o.getContent();
        this.createdAt = o.getCreatedAt();
    }
}
