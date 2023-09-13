package main.wonprice.domain.member.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Long countByMemberAndIsRead(Member member, Boolean readOrNot);

    Page<Notification> findByMemberAndDeletedAt(Member member, LocalDateTime localDateTime, Pageable pageable);

    List<Notification> findAllByMemberAndIsRead(Member member, Boolean isRead);

    List<Notification> findAllByMember(Member member);
}
