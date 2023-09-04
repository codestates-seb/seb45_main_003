package main.wonprice.domain.member.controller;

import main.wonprice.domain.member.dto.ReviewPostDto;
import main.wonprice.domain.member.dto.ReviewResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.mapper.ReviewMapper;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.member.service.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;
    private final ReviewMapper mapper;

    public ReviewController(ReviewService reviewService, MemberService memberService, ReviewMapper mapper) {
        this.reviewService = reviewService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/reviews")
    public ResponseEntity postReview(@RequestBody ReviewPostDto postDto) {

        Review review = mapper.postDtoToReview(postDto);
        review.setMember(memberService.findMember(postDto.getTargetMemberId()));
        review.setPostMemberId(memberService.findLoginMember().getMemberId());

        Review createdReview = reviewService.createReview(review);
        ReviewResponseDto response = mapper.reviewToResponseDto(createdReview);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }
    @GetMapping("/members/myPage/reviews")
    public ResponseEntity findLoginMembersReview(Pageable pageable) {

        Member loginMember = memberService.findLoginMember();

        List<Review> reviews = reviewService.findReviews(pageable, loginMember);
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

}
