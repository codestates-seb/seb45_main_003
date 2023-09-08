package main.wonprice.domain.member.mapper;

import main.wonprice.domain.member.dto.ReviewPatchDto;
import main.wonprice.domain.member.dto.ReviewPostDto;
import main.wonprice.domain.member.dto.ReviewResponseDto;
import main.wonprice.domain.member.entity.Review;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToReview(ReviewPostDto postDto);

    default ReviewResponseDto reviewToResponseDto(Review review) {
        ReviewResponseDto responseDto = new ReviewResponseDto();

        responseDto.setReviewId(review.getReviewId());
        responseDto.setPostMemberId(review.getPostMember().getMemberId());
        responseDto.setTargetMemberId(review.getTargetMemberId());
        responseDto.setProductId(review.getProduct().getProductId());
        responseDto.setScore(review.getScore());
        responseDto.setTitle(review.getTitle());
        responseDto.setContent(review.getContent());
        responseDto.setCreatedAt(review.getCreatedAt());

        return responseDto;
    }

    List<ReviewResponseDto> reviewsToResponseDtos(List<Review> reviews);

    Review patchDtoToReview(ReviewPatchDto patchDto);
}
