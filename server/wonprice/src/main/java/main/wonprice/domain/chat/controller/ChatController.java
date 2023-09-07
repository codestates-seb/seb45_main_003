package main.wonprice.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.controller.dto.ChatPostRequest;
import main.wonprice.domain.chat.dto.chat.ChatParticipantDto;
import main.wonprice.domain.chat.dto.message.MessageDto;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.Message;
import main.wonprice.domain.chat.mapper.ChatMapper;
import main.wonprice.domain.chat.service.ChatService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final MemberService memberService;
    private final ChatMapper chatMapper;

    @PostMapping("/chat")
    public ResponseEntity postChatRoom(@RequestBody ChatPostRequest request) {
//        log.info("chatPostDto : " + request.getProductId());

        ChatRoom chatRoom = chatMapper.postDtoToChatRoom(request);

        return new ResponseEntity(chatService.createChatRoom(chatRoom), HttpStatus.OK);
    }

    @GetMapping("/chat")
    public ResponseEntity getChatRoom() {
        Member loginMember = memberService.findLoginMember();

        log.info("loginMember : " + loginMember.getEmail());

//        List<ChatParticipant> findChatRooms = chatService.findMyChatRooms(loginMember.getMemberId());
        List<ChatParticipantDto> findChatRooms = chatService.findMyChatRooms(loginMember.getMemberId());


        return new ResponseEntity(findChatRooms, HttpStatus.OK);
    }

    @GetMapping("/chat/{room-id}")
    public ResponseEntity getMessage(@PathVariable("room-id") Long chatRoomId) {

//        List<Message> findMessages = chatService.findMessages(chatRoomId);
        List<MessageDto> findMessages = chatService.findMessages(chatRoomId);

        return new ResponseEntity(findMessages, HttpStatus.OK);
    }

    @DeleteMapping("/chat/{room-id}")
    public void deleteChatRoom(@PathVariable("room-id") Long chatRoomId) {
        Member loginMember = memberService.findLoginMember();

        chatService.deleteChatRoom(chatRoomId, loginMember.getMemberId());
    }

    @PostMapping("/chat/{room-id}")
    public void InsertChatParticipant(@PathVariable("room-id") Long chatRoomId) {
        Member loginMember = memberService.findLoginMember();

        chatService.deleteChatRoom(chatRoomId, loginMember.getMemberId());
    }

}
