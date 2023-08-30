package main.wonprice.domain.chat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

//    private Long buyerId;

    private Long productId;

    @Enumerated(EnumType.STRING)
    private RoomStatus status = RoomStatus.ACTIVE;

    private LocalDateTime createdAt = LocalDateTime.now();

//    @OneToOne
//    @JoinColumn(name = "deleted_id")
//    private ChatRoomDeleted chatRoomDeleted;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member seller;

    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private List<Message> messages;

    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private List<ChatParticipant> chatParticipants;
}
