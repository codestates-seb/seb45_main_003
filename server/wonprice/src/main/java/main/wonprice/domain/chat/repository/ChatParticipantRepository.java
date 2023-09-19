package main.wonprice.domain.chat.repository;

import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    List<ChatParticipant> findByMember(Member member); /* 반환 타입 Optional<ChatParticipant>로 수정 예정 */

    ChatParticipant findByMemberAndChatRoom(Member member, ChatRoom chatRoom);
}
