package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.member.repository.WishRepository;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WishService {

    private final WishRepository wishRepository;
    private final MemberService memberService;


    public Wish addWish(Wish wish) {
        return wishRepository.save(wish);
    }

    public List<Wish> findMemberWish(Pageable pageable, Member member) {

        return wishRepository.findByMember(pageable, member).getContent();
    }

    public void removeWish(Long wishId) {

        Optional<Wish> findWish = wishRepository.findById(wishId);

        if (!findWish.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);
        }

        memberService.validateOwner(findWish.get().getMember().getMemberId());
        wishRepository.deleteById(wishId);
    }
}
