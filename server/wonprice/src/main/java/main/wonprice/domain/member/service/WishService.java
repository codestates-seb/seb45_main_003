package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.member.repository.WishRepository;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class WishService {

    private final WishRepository wishRepository;
    private final MemberService memberService;
    private final ProductRepository productRepository;


    public Wish addWish(Wish wish) {

        Member member = wish.getMember();
        Product product = wish.getProduct();
        Optional<Wish> findWish = wishRepository.findByMemberAndProduct(member, product);

//        내 상품 찜할 경우
        if (product.getSeller() == member) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_ADD_YOUR_WISH);
        }

//        이미 찜했을 경우
        else if (findWish.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.WISH_ALREADY_EXISTS);
        }

        product.setWishCount(product.getWishCount() +1);
        productRepository.save(product);

        return wishRepository.save(wish);
    }

    public List<Wish> findMemberWish(Pageable pageable, Member member) {

        return wishRepository.findByMember(pageable, member).getContent();
    }

    public void removeWish(Long wishId) {

        Optional<Wish> findWish = wishRepository.findById(wishId);

        if (findWish.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);
        }

        // 지연 코드 추가 ---
        Wish wish = findWish.get();
        Product product = wish.getProduct();

        product.setWishCount(product.getWishCount() - 1);
        productRepository.save(product);
        // ----------------

        memberService.validateOwner(wish.getMember().getMemberId());
        wishRepository.deleteById(wishId);
    }

    /*
    * 찜 목록에서 선택 삭제 하기
    * boolean 배열로 순서대로 요청
    */
    public void removeWishes(List<Boolean> checkBox) {

        log.info(checkBox.toString());
        Member loginMember = memberService.findLoginMember();
        List<Wish> wishes = wishRepository.findByMember(loginMember);

        for (int i = 0; i < checkBox.size(); i++) {
            if (checkBox.get(i)) {
                removeWish(wishes.get(i).getWishId());
            }
        }
    }
}
