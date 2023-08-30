package main.wonprice.domain.chat.repository;

import main.wonprice.domain.chat.entity.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    List<ChatParticipant> findByMemberId(Long memberId); /* 반환 타입 Optional<ChatParticipant>로 수정 예정 */
}
