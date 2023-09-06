package main.wonprice.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.dto.chat.ChatParticipantDto;
import main.wonprice.domain.chat.dto.message.MessageDto;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.Message;
import main.wonprice.domain.chat.repository.ChatParticipantRepository;
import main.wonprice.domain.chat.repository.ChatRoomRepository;
import main.wonprice.domain.chat.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

    @Transactional
    public Long createChatRoom(ChatRoom chatRoom) {

        ChatRoom saveChatRoom = chatRoomRepository.save(chatRoom);

        return saveChatRoom.getChatRoomId();
    }

    public List<ChatParticipantDto> findMyChatRooms(Long memberId) {
        List<ChatParticipant> findChatRooms = chatParticipantRepository.findByMemberId(memberId);

        List<ChatParticipantDto> response = findChatRooms.stream()
                .map(o -> new ChatParticipantDto(o))
                .collect(Collectors.toList());

        log.info("ChatParticipantDto : " + response.toString());

        return response;
    }

    @Transactional
    public void deleteChatRoom(Long chatRoomId, Long memberId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        ChatParticipant deleteChatRoom = chatParticipantRepository.findByMemberIdAndChatRoom(memberId, findChatRoom);

        deleteChatRoom.setDeletedAt(LocalDateTime.now());
    }

    public List<MessageDto> findMessages(Long chatRoomId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        List<Message> findMessages = messageRepository.findByChatRoom(findChatRoom);

        List<MessageDto> response = findMessages.stream()
                .map(o -> new MessageDto(o))
                .collect(Collectors.toList());

        return response;
    }

    public ChatRoom findChatRoom(Long chatRoomId) {
        Optional<ChatRoom> findChatRoom = chatRoomRepository.findById(chatRoomId);

        return findChatRoom.orElseThrow();
    }
}
