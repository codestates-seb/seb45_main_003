package main.wonprice.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.repository.ChatParticipantRepository;
import main.wonprice.domain.chat.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantRepository chatParticipantRepository;

    @Transactional
    public Long createChatRoom(ChatRoom chatRoom) {

        ChatRoom saveChatRoom = chatRoomRepository.save(chatRoom);

        return saveChatRoom.getChatRoomId();
    }

    public List<ChatParticipant> findChatRoom(Long memberId) {
        List<ChatParticipant> findChatRooms = chatParticipantRepository.findByMemberId(memberId);

//        for (ChatParticipant findChatRoom : findChatRooms) {
//            log.info("findChatRoom.getChatRoom().getChatroomId() : " + findChatRoom.getChatRoom().getChatRoomId());
//        }

        return findChatRooms;
    }
}
