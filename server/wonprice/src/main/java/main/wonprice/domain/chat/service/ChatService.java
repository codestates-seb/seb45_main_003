package main.wonprice.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.repository.ChatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChatService {

    private final ChatRepository chatRepository;

    @Transactional
    public Long createChatRoom(ChatRoom chatRoom) {

        ChatRoom saveChatRoom = chatRepository.save(chatRoom);

        log.info("saveChatRoom.getChatParticipants() : " + saveChatRoom.getChatParticipants());

        return saveChatRoom.getChatRoomId();
    }
}
