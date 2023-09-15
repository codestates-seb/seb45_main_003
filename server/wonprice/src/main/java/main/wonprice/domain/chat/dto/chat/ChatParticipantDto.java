package main.wonprice.domain.chat.dto.chat;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.picture.entity.Picture;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Slf4j
public class ChatParticipantDto {

    private Long chatRoomId;
//    private Long chatParticipantId;
    private Long memberId;
    private String path;
    private Long productId;
    private LocalDateTime deletedAt;
    private Integer unReadMessage;
    private LocalDateTime createdAt;
    private ChatParticipantChatRoomDto chatRoom;
    private ChatParticipantMessagesDto message;

    public ChatParticipantDto(ChatParticipant chatParticipant) {
        this.chatRoomId = chatParticipant.getChatRoom().getChatRoomId();
        this.productId = chatParticipant.getChatRoom().getProductId();
        this.unReadMessage = chatParticipant.getUnreadMessages();
        this.createdAt = chatParticipant.getChatRoom().getCreatedAt();
        if(chatParticipant.getMember().getPicture() == null) {
            this.path = "https://wonprice-test1.s3.ap-northeast-2.amazonaws.com/default_profile.png";
        } else {
            this.path = chatParticipant.getMember().getPicture().getPath();
        }

//        this.chatParticipantId = chatParticipant.getChatParticipantId();
        this.memberId = chatParticipant.getMember().getMemberId();
        this.deletedAt = chatParticipant.getDeletedAt();
        this.chatRoom = chatParticipant.getChatRoom().getChatParticipantList().stream()
                .map(o -> new ChatParticipantChatRoomDto(o))
                .filter(o -> o.getMemberId() != memberId)
                .collect(Collectors.toList()).get(0);

        List<ChatParticipantMessagesDto> messages = chatParticipant.getChatRoom().getMessages().stream()
                .map(o -> new ChatParticipantMessagesDto(o))
                .collect(Collectors.toList());

        if (!messages.isEmpty()) {
            this.message = messages.get(messages.size() - 1);
        }

    }
}
