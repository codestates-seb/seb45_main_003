package main.wonprice.domain.member.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Long countByMemberAndIsRead(Member member, Boolean readOrNot);

    Page<Notification> findByMember(Member member, Pageable pageable);
}
