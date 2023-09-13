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
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
        Member loginMember = memberService.findLoginMember();
        review.setPostMember(loginMember);
        review.setProduct(productService.findOneById(postDto.getProductId()));

//        리뷰 작성자가 판매자인지 구매자인지 식별
        if (loginMember == review.getProduct().getSeller()) {
            review.setReceiveMember(memberService.findMember(review.getProduct().getBuyerId()));
        } else if (loginMember == memberService.findMember(review.getProduct().getBuyerId())) {
            review.setReceiveMember(review.getProduct().getSeller());
        } else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);

        Review createdReview = reviewService.createReview(review);
        ReviewResponseDto response = mapper.reviewToResponseDto(createdReview);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("/reviews/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") Long reviewId) {

        Review findReview = reviewService.findReview(reviewId);
        ReviewResponseDto response = mapper.reviewToResponseDto(findReview);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/members/{member-id}/reviews/post")
    public ResponseEntity fingMemberwroteReview(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size,
                                                @PathVariable("member-id")Long memberId) {

        Pageable pageable = PageRequest.of(page, size);

        Member member = memberService.findMember(memberId);

        Page<Review> reviews = reviewService.findWroteReviews(pageable, member);
        Page<ReviewResponseDto> response = reviews.map(mapper::reviewToResponseDto);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/members/{member-id}/reviews")
    public ResponseEntity findMembersReviews(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size,
                                             @PathVariable("member-id") Long memberId) {

        Pageable pageable = PageRequest.of(page, size);

        Member findMember = memberService.findMember(memberId);

        Page<Review> reviews = reviewService.findReviews(pageable, findMember);
        Page<ReviewResponseDto> response = reviews.map(mapper::reviewToResponseDto);

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
