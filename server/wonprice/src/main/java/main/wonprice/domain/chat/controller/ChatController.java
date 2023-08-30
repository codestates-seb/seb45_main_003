package main.wonprice.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.controller.dto.ChatPostRequest;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.chat.entity.ChatRoom;
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
    public void postChatRoom(@RequestBody ChatPostRequest request) {
//        log.info("chatPostDto : " + request.getProductId());

        ChatRoom chatRoom = chatMapper.postDtoToChatRoom(request);

        chatService.createChatRoom(chatRoom);

    }

    @GetMapping("/chat")
    public ResponseEntity getChatRoom() {
        Member loginMember = memberService.findLoginMember();

        List<ChatParticipant> findChatRooms = chatService.findMyChatRooms(loginMember.getMemberId());

        return new ResponseEntity(findChatRooms, HttpStatus.OK);
    }

    @DeleteMapping("/chat/{room-id}")
    public void deleteChatRoom(@PathVariable("room-id") Long chatRoomId) {
        Member loginMember = memberService.findLoginMember();

        chatService.deleteChatRoom(chatRoomId, loginMember.getMemberId());
    }
}
