package main.wonprice.domain.chat.dto.chat;

import lombok.Getter;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.picture.entity.MemberPicture;

import java.time.LocalDateTime;

@Getter
public class ChatParticipantChatRoomDto {

//    private Long chatParticipantId;
    private Long memberId;

    private String name;
    private LocalDateTime deletedAt;
    private String path;

    public ChatParticipantChatRoomDto(ChatParticipant o) {
//        this.chatParticipantId = o.getChatParticipantId();
        this.name = o.getMember().getName();
        this.memberId = o.getMember().getMemberId();
        this.deletedAt = o.getDeletedAt();

        if(o.getMember().getPicture() == null) {
            this.path = "https://wonprice-test1.s3.ap-northeast-2.amazonaws.com/default_profile.png";
        } else {
            this.path = o.getMember().getPicture().getPath();
        }
    }
}
