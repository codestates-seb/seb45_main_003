package main.wonprice.domain.chat.repository;

import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

    ChatSession findByChatRoomAndMemberId(ChatRoom chatRoom, Long memberId);

    ChatSession findBySessionId(String sessionId);

    List<ChatSession> findByChatRoom(ChatRoom chatRoom);
}
