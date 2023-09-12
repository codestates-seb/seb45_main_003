package main.wonprice.domain.chat.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.wonprice.domain.chat.dto.message.MessageDto;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatGetResponse {

    private List<MessageDto> messageList = new ArrayList<>();
    private Long sequence;
}
