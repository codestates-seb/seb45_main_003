package main.wonprice.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.controller.dto.ChatPostRequest;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.mapper.ChatMapper;
import main.wonprice.domain.chat.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final ChatMapper chatMapper;

    @PostMapping("/chat")
    public void postChatRoom(@RequestBody ChatPostRequest request) {
//        log.info("chatPostDto : " + request.getProductId());

        ChatRoom chatRoom = chatMapper.postDtoToChatRoom(request);

        chatService.createChatRoom(chatRoom);

    }
}
