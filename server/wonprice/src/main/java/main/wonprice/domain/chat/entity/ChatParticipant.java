package main.wonprice.domain.chat.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Entity
@Getter @Setter
public class ChatParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatParticipantId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    private Long currentSequence;


    public Integer getUnreadMessages() {
        return chatRoom.getMessages().stream()
                .filter(message -> message.getMessageId() > currentSequence)
                .collect(Collectors.toList())
                .size();
    }
}
