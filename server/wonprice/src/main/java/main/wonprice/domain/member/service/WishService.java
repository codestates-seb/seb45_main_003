package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.member.repository.WishRepository;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WishService {

    private final WishRepository wishRepository;
    private final MemberService memberService;
    private final ProductRepository productRepository;


    public Wish addWish(Wish wish) {
        // 지연 코드 추가 ---

        Member member = wish.getMember();
        Product product = wish.getProduct();

        Boolean hasWish = wishRepository.existsByMemberAndProduct(member, product);

        if(hasWish){
            throw  new BusinessLogicException(ExceptionCode.WISH_ALREADY_EXISTS);
        }

        product.setWishCount(product.getWishCount() +1);
        productRepository.save(product);
        // ----------------
        return wishRepository.save(wish);
    }

    public List<Wish> findMemberWish(Pageable pageable, Member member) {

        return wishRepository.findByMember(pageable, member)
                .stream()
                .filter(wish -> wish.getDeletedAt() != null)
                .collect(Collectors.toList());
    }

    public void removeWish(Long wishId) {

        Optional<Wish> findWish = wishRepository.findById(wishId);

        if (!findWish.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);
        }

        // 지연 코드 추가 ---
        Wish wish = findWish.get();
        Product product = wish.getProduct();

        product.setWishCount(product.getWishCount() - 1);
        productRepository.save(product);
        // ----------------

        memberService.validateOwner(findWish.get().getMember().getMemberId());
        wish.setDeletedAt(LocalDateTime.now());
    }

    public void removeWishes(List<Boolean> checkBox) {

        Member loginMember = memberService.findLoginMember();
        List<Wish> wishes = wishRepository.findByMember(loginMember);

        for (int i = 0; i < checkBox.size(); i++) {
            if (checkBox.get(i)) {
                removeWish(wishes.get(i).getWishId());
            }
        }
    }
}
