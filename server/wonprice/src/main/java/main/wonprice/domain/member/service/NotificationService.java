package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.entity.Notification;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.mapper.NotificationMapper;
import main.wonprice.domain.member.repository.NotificationRepository;
import main.wonprice.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
@Transactional
public class NotificationService {

    private final MemberService memberService;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper mapper;

//    안읽은 알림 개수
    public Long getUnreadCount() {

        Long count = notificationRepository.countByMemberAndIsRead(memberService.findLoginMember(), false);

        return count;
    }

//    알림 목록
    public Page<Notification> findNotifications(Pageable pageable) {

        return notificationRepository.findByMember(memberService.findLoginMember(), pageable);
    }

    public Notification createNotification(Product product) {
        return null;
    }

    public Notification createNotification(Review review) {

        Notification notification = mapper.reviewToNotification(review);
        notificationRepository.save(notification);

        return notification;
    }
}
