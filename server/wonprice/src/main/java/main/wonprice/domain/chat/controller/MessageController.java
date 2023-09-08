package main.wonprice.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.controller.dto.MessageSendRequest;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.Message;
import main.wonprice.domain.chat.service.ChatService;
import main.wonprice.domain.chat.service.MessageService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final MessageService messageService;
    private final MemberService memberService;
    private final ChatService chatService;

    /* PathVariable == MessageMapping에서 DestinationVariable */
    /* MessageMapping 경로에서 WebSocketConfig setApplicationDestinationPrefixes 값이 앞에 붙는다. */
    @MessageMapping("/chat/{room-id}")
    @SendTo("/topic/chat/{room-id}")
    public ResponseEntity sendMessage(@DestinationVariable("room-id") Long roomId, @RequestBody MessageSendRequest request) {

//        Member loginMember = memberService.findLoginMember(); 테스트에서는 Header 값 X 실제 클라이언트가 CustomHeader ? 방법 생각중
        ChatRoom findChatRoom = chatService.findChatRoom(roomId);

        /* sender_id = logimMember.getEmail(), created_at = LocalDateTime.now(), chat_room_id = roomId , content = request.content */
        /* 아래 Mapper로 수정 예정 */
        Message message = new Message();

        log.info("request.getContent : " + request.getContent());
        message.setContent(request.getContent());
        message.setSenderId(8L);
        log.info("sender_id : " + message.getSenderId());
        message.setChatRoom(findChatRoom);

        messageService.saveMessage(message);

        return new ResponseEntity(message.getContent(), HttpStatus.OK);
    }

}
