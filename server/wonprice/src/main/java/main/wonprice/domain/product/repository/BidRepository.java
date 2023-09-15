package main.wonprice.domain.product.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.entity.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    Bid findByProductProductIdAndMember(Long productId, Member member);

    List<Bid> findAllByProductProductId(Long productId);

    Page<Bid> findAllByMemberMemberId(Pageable pageable, Long memberId);
}
