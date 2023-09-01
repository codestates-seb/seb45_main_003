package main.wonprice.domain.member.service;

import main.wonprice.domain.member.dto.WishResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.member.repository.WishRepository;
import main.wonprice.domain.product.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishService {

    private final WishRepository wishRepository;

    public WishService(WishRepository wishRepository) {
        this.wishRepository = wishRepository;
    }

    public Wish addWish(Wish wish) {
        return wishRepository.save(wish);
    }

    public List<Wish> findMemberWish(Pageable pageable, Member member) {

        return wishRepository.findByMember(pageable, member).getContent();
    }
}
