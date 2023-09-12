package main.wonprice.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.dto.chat.ChatGetResponse;
import main.wonprice.domain.chat.dto.chat.ChatParticipantDto;
import main.wonprice.domain.chat.dto.message.MessageDto;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.Message;
import main.wonprice.domain.chat.repository.ChatParticipantRepository;
import main.wonprice.domain.chat.repository.ChatRoomRepository;
import main.wonprice.domain.chat.repository.MessageRepository;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
//    private final ReadSequenceRepository readSequenceRepository;

    @Transactional
    public Long createChatRoom(ChatRoom chatRoom) {

        ChatRoom saveChatRoom = chatRoomRepository.save(chatRoom);

        return saveChatRoom.getChatRoomId();
    }

    public List<ChatParticipantDto> findMyChatRooms(Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow();

        List<ChatParticipant> findChatRooms = chatParticipantRepository.findByMember(member);

        List<ChatParticipantDto> response = findChatRooms.stream()
                .map(o -> new ChatParticipantDto(o))
                .collect(Collectors.toList());

        log.info("ChatParticipantDto : " + response.toString());

        return response;
    }

    @Transactional
    public void deleteChatRoom(Long chatRoomId, Long memberId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

//        ChatParticipant deleteChatRoom = chatParticipantRepository.findByMemberAndChatRoom(memberId, findChatRoom);

//        deleteChatRoom.setDeletedAt(LocalDateTime.now());
    }
    public ChatGetResponse findMessages(Long chatRoomId, Long memberId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        Long currentSequence = findChatRoom.getChatParticipantList().stream()
                .filter(o -> o.getMember().getMemberId() != memberId)
                .collect(Collectors.toList())
                .get(0).getCurrentSequence();

        List<Message> findMessages = messageRepository.findByChatRoom(findChatRoom);

        List<MessageDto> messageList = findMessages.stream()
                .map(o -> new MessageDto(o))
                .collect(Collectors.toList());

        ChatGetResponse chatGetResponse = new ChatGetResponse(messageList, currentSequence);

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


}
