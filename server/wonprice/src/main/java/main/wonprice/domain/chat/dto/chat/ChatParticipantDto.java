package main.wonprice.domain.chat.dto.chat;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.entity.ChatParticipant;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Slf4j
public class ChatParticipantDto {

    private Long chatRoomId;
//    private Long chatParticipantId;
    private Long memberId;
    private Long productId;
    private LocalDateTime deletedAt;
    private List<ChatParticipantChatRoomDto> chatRoom;
    private List<ChatParticipantMessagesDto> message;

    public ChatParticipantDto(ChatParticipant chatParticipant) {
        this.chatRoomId = chatParticipant.getChatRoom().getChatRoomId();
        this.productId = chatParticipant.getChatRoom().getProductId();
//        this.chatParticipantId = chatParticipant.getChatParticipantId();
        this.memberId = chatParticipant.getMemberId();
        this.deletedAt = chatParticipant.getDeletedAt();
        this.chatRoom = chatParticipant.getChatRoom().getChatParticipantList().stream()
                .map(o -> new ChatParticipantChatRoomDto(o))
                .filter(o -> o.getMemberId() != memberId)
                .collect(Collectors.toList());
        this.message = chatParticipant.getChatRoom().getMessages().stream()
                .map(o -> new ChatParticipantMessagesDto(o))
                .collect(Collectors.toList());
    }
}
