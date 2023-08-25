package main.wonprice.domain.chat.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class ChatRoomDeleted {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deletedId;

    private Boolean sellerDeleted;

    private Boolean buyerDeleted;

}
