package main.wonprice.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.dto.chat.ChatGetResponse;
import main.wonprice.domain.chat.dto.chat.ChatParticipantDto;
import main.wonprice.domain.chat.dto.message.MessageDto;
import main.wonprice.domain.chat.entity.*;
import main.wonprice.domain.chat.repository.ChatParticipantRepository;
import main.wonprice.domain.chat.repository.ChatRoomRepository;
import main.wonprice.domain.chat.repository.ChatSessionRepository;
import main.wonprice.domain.chat.repository.MessageRepository;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Notification;
import main.wonprice.domain.member.repository.MemberRepository;
import main.wonprice.domain.member.service.NotificationService;
import main.wonprice.domain.product.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatSessionRepository chatSessionRepository;
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
    private final NotificationService notificationService;
//    private final ReadSequenceRepository readSequenceRepository;

    @Transactional
    public Long createChatRoom(Product product) {

        Member seller = product.getSeller();
        Member buyer = memberRepository.findById(product.getBuyerId()).orElseThrow();

        /* 대표 아래 Mapper 수정 예정 */
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setProductId(product.getProductId());
        chatRoom.setCreatedAt(LocalDateTime.now());

        ChatRoom saveChatRoom = chatRoomRepository.save(chatRoom);

        List<ChatParticipant> chatParticipants =
                insertChatParticipant(chatRoom.getChatRoomId(), List.of(seller, buyer));

        notificationService.createNotificationWithChatParticipant(product, chatParticipants);

        return saveChatRoom.getChatRoomId();
    }

    public List<ChatParticipantDto> findMyChatRooms(Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow();

        List<ChatParticipant> findChatRooms = chatParticipantRepository.findByMember(member);

        List<ChatParticipantDto> response = findChatRooms.stream()
                .map(o -> new ChatParticipantDto(o))
                .collect(Collectors.toList());

//        log.info("ChatParticipantDto : " + response.toString());

        return response;
    }

    @Transactional
    public void deleteChatRoom(Long chatRoomId, Member member) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        ChatParticipant deleteChatRoom = chatParticipantRepository.findByMemberAndChatRoom(member, findChatRoom);

        deleteChatRoom.setDeletedAt(LocalDateTime.now());
    }

    public ChatGetResponse findMessages(Long chatRoomId, Long memberId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        Long currentSequence = findChatRoom.getChatParticipantList().stream()
                .filter(o -> o.getMember().getMemberId() != memberId)
                .collect(Collectors.toList())
                .get(0).getCurrentSequence();

        List<Message> findMessages = messageRepository.findByChatRoom(findChatRoom);

        RoomStatus status = findChatRoom.getStatus();
        LocalDateTime createdAt = findChatRoom.getCreatedAt();

        List<MessageDto> messageList = findMessages.stream()
                .map(o -> new MessageDto(o))
                .collect(Collectors.toList());

//        log.info("ㄷㅍ : " + currentSequence);
        ChatGetResponse chatGetResponse = new ChatGetResponse(messageList, currentSequence, status, createdAt);

        return chatGetResponse;
    }

    public ChatRoom findChatRoom(Long chatRoomId) {
        Optional<ChatRoom> findChatRoom = chatRoomRepository.findById(chatRoomId);

        return findChatRoom.orElseThrow();
    }

    @Transactional
    public void updateSequence(Member member, ChatRoom chatRoom, Long messageId) {

        ChatParticipant findChatParticipant = chatParticipantRepository.findByMemberAndChatRoom(member, chatRoom);

        findChatParticipant.setCurrentSequence(messageId);
    }

    @Transactional
    public void insertChatParticipant(Long chatRoomId, Member member) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        /* 대표 아래 매퍼 수정 예정 */

        ChatParticipant chatParticipant = new ChatParticipant();
        chatParticipant.setMember(member);
        chatParticipant.setChatRoom(findChatRoom);
        chatParticipant.setCurrentSequence(0L);

        chatParticipantRepository.save(chatParticipant);
    }

    // Disconnect 할 때는 Header X 즉 sessionId로 구분
    public ChatSession findChatSessionBySessionId(String sessionId) {
        ChatSession chatSession = chatSessionRepository.findBySessionId(sessionId);

        return chatSession;
    }

    // MessageController에서는 chat_room_id로 현재 접속자 수 카운팅
    public List<ChatSession> findChatSessionByChatRoom(ChatRoom chatRoom) {
        List<ChatSession> currentChatRoomParticipants = chatSessionRepository.findByChatRoom(chatRoom);

        return currentChatRoomParticipants;
    }

    @Transactional
    public void insertChatSession(Long chatRoomId, Long memberId, String sessionId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);
        ChatSession findChatSession = existChatSession(chatRoomId, memberId);

        if (findChatSession != null) {
            chatSessionRepository.deleteById(findChatSession.getChatSessionId());
        }

        ChatSession chatSession = new ChatSession();

        chatSession.setChatRoom(findChatRoom);
        chatSession.setMemberId(memberId);
        chatSession.setSessionId(sessionId);

        chatSessionRepository.save(chatSession);
    }

    @Transactional
    public void deleteChatSession(String sessionId) {
        ChatSession findChatSession = findChatSessionBySessionId(sessionId);

        chatSessionRepository.deleteById(findChatSession.getChatSessionId());
    }

    public ChatSession existChatSession(Long chatRoomId, Long memberId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        ChatSession findChatSession = chatSessionRepository.findByChatRoomAndMemberId(findChatRoom, memberId);

        return findChatSession;
    }

//    정욱 수정
    @Transactional
    public List<ChatParticipant> insertChatParticipant(Long chatRoomId, List<Member> members) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        List<ChatParticipant> chatParticipants = new ArrayList<>();

        for (Member member : members) {
            ChatParticipant participant = new ChatParticipant();
            participant.setMember(member);
            participant.setChatRoom(findChatRoom);
            participant.setChatParticipantId(0L);

            chatParticipants.add(participant);
        }

        log.info(chatParticipants
                .stream()
                .map(chatParticipant -> chatParticipant.getMember().getName())
                .collect(Collectors.toList())
                .toString());

        return chatParticipantRepository.saveAll(chatParticipants);
    }
}
