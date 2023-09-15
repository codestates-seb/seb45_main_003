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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    @Transactional(readOnly = true)
    public Page<Wish> findMemberWish(Pageable pageable, Member member) {

        return wishRepository.findByMember(pageable, member);
    }

    public void removeWish(Long productId) {

        Optional<Wish> findWish = wishRepository.findByProductProductIdAndMember(productId, memberService.findLoginMember());

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
        wishRepository.deleteByProductProductId(productId);
    }

    /*
    * 찜 목록에서 선택 삭제 하기
    * boolean 배열로 순서대로 요청
    */
    public void removeWishes(List<Boolean> checkBox, int page) {

        log.info(checkBox.toString());
        Member loginMember = memberService.findLoginMember();

        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Order.desc("createdAt")));

        List<Wish> wishes = findMemberWish(pageable, loginMember).getContent();

        for (int i = 0; i < checkBox.size(); i++) {
            if (checkBox.get(i)) {
                removeWish(wishes.get(i).getProduct().getProductId());
            }
        }
    }

    public Member findReviewReceiver(Long productId) {

        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        Product product = optionalProduct.get();
        Member loginMember = memberService.findLoginMember();

        if (loginMember == product.getSeller()) {
            return memberService.findMember(product.getBuyerId());
        } else if (loginMember == memberService.findMember(product.getBuyerId())) {
            return product.getSeller();
        } else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
    }
}
