package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.repository.ReviewRepository;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository repository;
    private final MemberService memberService;
    private final NotificationService notificationService;
    private final ProductRepository productRepository;

    public Review createReview(Review review) {

        Product product = review.getProduct();

        Long reviewPostMemberId = review.getPostMember().getMemberId();

//        본인에게 리뷰 작성
        if (review.getReceiveMember() == review.getPostMember()) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN_REQUEST);
        }
//        구매자가 리뷰 작성
        else if (!product.getBuyerReview() && Objects.equals(reviewPostMemberId, product.getBuyerId())) {
            product.setBuyerReview(true);
            product.getSeller().setReputation(product.getSeller().getReputation() + review.getScore());

            review.getPostMember().setWrittenReviewsCount(review.getPostMember().getWrittenReviewsCount() + 1);
            product.getSeller().setReceivedReviewsCount(product.getSeller().getReceivedReviewsCount() + 1);

            Review savedReview = repository.save(review);
            notificationService.createNotificationWithReview(review);
            return savedReview;
        }
//        판매자가 리뷰 작성
        else if (!product.getSellerReview() && Objects.equals(reviewPostMemberId, product.getSeller().getMemberId())) {
            product.setSellerReview(true);
            Member buyer = memberService.findMember(product.getBuyerId());

            buyer.setReputation(buyer.getReputation() + review.getScore());

            review.getPostMember().setWrittenReviewsCount(review.getPostMember().getWrittenReviewsCount() + 1);
            buyer.setReceivedReviewsCount(buyer.getReceivedReviewsCount() + 1);

            Review savedReview = repository.save(review);
            notificationService.createNotificationWithReview(review);
            return savedReview;
        } else if (product.getBuyerReview() || product.getSellerReview()) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_EXISTS);
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
        }
    }

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId) {
        return findVerifiedReview(reviewId);
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviews(Pageable pageable, Member member) {

        return repository.findAllByReceiveMember(pageable, member);
    }

    @Transactional(readOnly = true)
    public Page<Review> findWroteReviews(Pageable pageable, Member member) {

        return repository.findAllByPostMember(pageable, member);
    }

    public Review updateReview(Review review) {

        Review findReview = findVerifiedReview(review.getReviewId());

        memberService.validateOwner(findReview.getPostMember().getMemberId());

        if (review.getTitle() != null) {
            findReview.setTitle(review.getTitle());
        }
        if (review.getContent() != null) {
            findReview.setContent(review.getContent());
        }
        if (review.getScore() != null) {
            findReview.setScore(review.getScore());
        }

        return findReview;
    }

    public void deleteReview(Long reviewId) {

        Review findReview = findVerifiedReview(reviewId);

        memberService.validateOwner(findReview.getPostMember().getMemberId());
        repository.deleteById(reviewId);

        if (findReview.getPostMember().getMemberId() == findReview.getProduct().getSeller().getMemberId()) {
            findReview.getProduct().setSellerReview(false);
        }
        if (findReview.getPostMember().getMemberId() == findReview.getProduct().getBuyerId()) {
            findReview.getProduct().setBuyerReview(false);
        }
    }

    public Review findVerifiedReview(Long reviewId) {

        Optional<Review> verifiedReview = repository.findById(reviewId);

        if (verifiedReview.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND);
        }

        return verifiedReview.get();
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
