package main.wonprice.domain.member.controller;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.dto.ReviewPatchDto;
import main.wonprice.domain.member.dto.ReviewPostDto;
import main.wonprice.domain.member.dto.ReviewResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.mapper.ReviewMapper;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.member.service.ReviewService;
import main.wonprice.domain.product.service.ProductServiceImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;
    private final ProductServiceImpl productService;
    private final ReviewMapper mapper;

    @PostMapping("/reviews")
    public ResponseEntity postReview(@RequestBody ReviewPostDto postDto) {

        Review review = mapper.postDtoToReview(postDto);
        review.setPostMember(memberService.findLoginMember());
        review.setProduct(productService.findOneById(postDto.getProductId()));

        Review createdReview = reviewService.createReview(review);
        ReviewResponseDto response = mapper.reviewToResponseDto(createdReview);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("/members/{member-id}/reviews/post")
    public ResponseEntity fingMemberwroteReview(Pageable pageable,
                                                     @PathVariable("member-id")Long memberId) {

        Member member = memberService.findMember(memberId);

        List<Review> reviews = reviewService.findWroteReviews(pageable, member);
        List<ReviewResponseDto> response = mapper.reviewsToResponseDtos(reviews);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/members/{member-id}/reviews")
    public ResponseEntity findMembersReviews(Pageable pageable,
                                             @PathVariable("member-id") Long memberId) {

        Member findMember = memberService.findMember(memberId);

        List<Review> reviews = reviewService.findReviews(pageable, findMember);
        List<ReviewResponseDto> response = mapper.reviewsToResponseDtos(reviews);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/reviews/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") Long reviewId,
                                      @RequestBody ReviewPatchDto patchDto) {

        Review review = mapper.patchDtoToReview(patchDto);
        review.setReviewId(reviewId);

        Review patchedReview = reviewService.updateReview(review);
        ReviewResponseDto response = mapper.reviewToResponseDto(patchedReview);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/reviews/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") Long reviewId) {

        reviewService.deleteReview(reviewId);

        return new ResponseEntity(HttpStatus.OK);
    }

}
