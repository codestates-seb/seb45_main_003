package main.wonprice.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.controller.dto.ChatGetRequest;
import main.wonprice.domain.chat.controller.dto.ChatPostRequest;
import main.wonprice.domain.chat.controller.dto.MemberIdRequest;
import main.wonprice.domain.chat.controller.dto.SequenceRequest;
import main.wonprice.domain.chat.dto.chat.ChatGetResponse;
import main.wonprice.domain.chat.dto.chat.ChatParticipantDto;
import main.wonprice.domain.chat.dto.message.MessageDto;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.Message;
import main.wonprice.domain.chat.mapper.ChatMapper;
import main.wonprice.domain.chat.service.ChatService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.service.ProductService;
import main.wonprice.domain.product.service.ProductServiceImpl;
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
    private final ProductServiceImpl productService;
    private final ChatMapper chatMapper;

    @PostMapping("/chat")
    public ResponseEntity postChatRoom(@RequestBody ChatPostRequest request) {
//        log.info("chatPostDto : " + request.getProductId());

        return new ResponseEntity(chatService.createChatRoom(request.getProductId()), HttpStatus.OK);
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
    public ResponseEntity getMessage(@PathVariable("room-id") Long chatRoomId, @RequestParam Long memberId) {
        Member loginMember = memberService.findMember(memberId);
        ChatRoom findChatRoom = chatService.findChatRoom(chatRoomId);

//        log.info("memberId : " + memberId);
//        List<MessageDto> findMessages = chatService.findMessages(chatRoomId, request.getMemberId());
        ChatGetResponse findMessages = chatService.findMessages(chatRoomId, memberId);

        if (!findMessages.getMessageList().isEmpty()) {
            chatService.updateSequence(loginMember, findChatRoom, findMessages.getMessageList().get(findMessages.getMessageList().size() - 1).getMessageId());
        } else {
            log.info("findMessages.getMessageList() : null");
            chatService.updateSequence(loginMember, findChatRoom, 0L);
        }

        /* 조회해서 list가 1이면 안읽음, 2면 읽음처리 */

        return new ResponseEntity(findMessages, HttpStatus.OK);
    }

//    @PostMapping("/chat/{room-id}")
//    public void InsertChatParticipant(@PathVariable("room-id") Long chatRoomId) {
//        Member loginMember = memberService.findLoginMember();
//
//        chatService.deleteChatRoom(chatRoomId, loginMember.getMemberId());
//    }

    @PostMapping("/chat/sequence/{room-id}")
    public void updateSequence(@PathVariable("room-id") Long chatRoomId, @RequestBody SequenceRequest request) {
        Member loginMember = memberService.findMember(request.getMemberId());
        ChatRoom findChatRoom = chatService.findChatRoom(chatRoomId);

        chatService.updateSequence(loginMember, findChatRoom, request.getMessageId());
    }

    @DeleteMapping("/chat/{room-id}")
    public void deleteChatRoom(@PathVariable("room-id") Long chatRoomId, @RequestBody MemberIdRequest request) {
//        Member loginMember = memberService.findLoginMember();

        Member member = memberService.findMember(request.getMemberId());

        chatService.deleteChatRoom(chatRoomId, member);
    }

    @PostMapping("/chat/completed/{room-id}")
    public ResponseEntity completedChat(@PathVariable("room-id") Long chatRoomId) {
        ChatRoom chatRoom = chatService.findChatRoom(chatRoomId);
        Long productId = chatRoom.getProductId();

        productService.updateCompletedProduct(productId, chatRoom);

        return new ResponseEntity(HttpStatus.OK);
    }
}
