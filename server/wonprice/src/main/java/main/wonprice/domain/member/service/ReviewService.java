package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.repository.ReviewRepository;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository repository;
    private final MemberService memberService;

    public Review createReview(Review review) {

        Product product = review.getProduct();

        Long reviewPostMemberId = review.getPostMember().getMemberId();

        if (!product.getBuyerReview() && Objects.equals(reviewPostMemberId, product.getBuyerId())) {
            product.setBuyerReview(true);
            return repository.save(review);
        }
        else if (!product.getSellerReview() && Objects.equals(reviewPostMemberId, product.getSeller().getMemberId())) {
            product.setSellerReview(true);
            return repository.save(review);
        }
        else if (product.getBuyerReview() || product.getSellerReview()) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_EXISTS);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
        }
    }

    @Transactional(readOnly = true)
    public List<Review> findReviews(Pageable pageable, Member member) {

        List<Review> reviews = repository.findAllByTargetMemberId(pageable, member.getMemberId()).getContent();
        return reviews.stream()
                .filter(review -> review.getDeletedAt() == null)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Review> findWroteReviews(Pageable pageable, Member member) {

        List<Review> reviews = repository.findAllByPostMember(pageable, member).getContent();
        return reviews.stream()
                .filter(review -> review.getDeletedAt() == null)
                .collect(Collectors.toList());
    }

    public Review updateReview(Review review) {

        Review findReview = findVerifiedReview(review.getReviewId());

        memberService.validateOwner(findReview.getPostMember().getMemberId());

        findReview.setContent(review.getContent());
        return findReview;
    }

    public void deleteReview(Long reviewId) {

        Review findReview = findVerifiedReview(reviewId);

        memberService.validateOwner(findReview.getPostMember().getMemberId());

        findReview.setDeletedAt(LocalDateTime.now());
    }

    public Review findVerifiedReview(Long reviewId) {

        Optional<Review> verifiedReview = repository.findById(reviewId);

        if (verifiedReview.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND);
        }

        return verifiedReview.get();
    }
}
