package main.wonprice.domain.member.repository;


import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishRepository extends JpaRepository<Wish, Long> {

    Page<Wish> findByMember(Pageable pageable, Member member);

    List<Wish> findByMember(Member member);

    Optional<Wish> findByMemberAndProduct(Member member, Product product);

    void deleteByProductProductId(Long productId);

    Optional<Wish> findByProductProductIdAndMember(Long productId, Member member);
}
