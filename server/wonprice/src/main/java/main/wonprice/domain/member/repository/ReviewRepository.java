package main.wonprice.domain.member.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findAllByMember(Pageable pageable, Member member);

    Page<Review> findAllByPostMemberId(Pageable pageable, Long memberId);
}
