package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.repository.ReviewRepository;
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
@Transactional
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository repository;
    private final MemberService memberService;

    public Review createReview(Review review) {
        return repository.save(review);
    }

    @Transactional(readOnly = true)
    public List<Review> findReviews(Pageable pageable, Member member) {

        List<Review> reviews = repository.findAllByProductSeller(pageable, member).getContent();
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
