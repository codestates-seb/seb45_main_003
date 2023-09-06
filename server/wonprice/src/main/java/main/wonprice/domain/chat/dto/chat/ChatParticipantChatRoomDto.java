package main.wonprice.domain.chat.dto.chat;

import lombok.Getter;
import main.wonprice.domain.chat.entity.ChatParticipant;

import java.time.LocalDateTime;

@Getter
public class ChatParticipantChatRoomDto {

//    private Long chatParticipantId;
    private Long memberId;
    private LocalDateTime deletedAt;

    public ChatParticipantChatRoomDto(ChatParticipant o) {
//        this.chatParticipantId = o.getChatParticipantId();
        this.memberId = o.getMemberId();
        this.deletedAt = o.getDeletedAt();
    }
}
