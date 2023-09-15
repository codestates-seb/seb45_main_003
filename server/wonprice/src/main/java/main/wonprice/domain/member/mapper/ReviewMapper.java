package main.wonprice.domain.member.mapper;

import main.wonprice.domain.member.dto.ReviewPatchDto;
import main.wonprice.domain.member.dto.ReviewPostDto;
import main.wonprice.domain.member.dto.ReviewResponseDto;
import main.wonprice.domain.member.entity.Review;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToReview(ReviewPostDto postDto);

    default ReviewResponseDto reviewToResponseDto(Review review) {

        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId())
                .postMemberName(review.getPostMember().getName())
                .title(review.getProduct().getTitle())
                .productImages(review.getProduct().getProductPictures())
                .reviewTitle(review.getTitle())
                .content(review.getContent())
                .score(review.getScore())
                .createdAt(review.getCreatedAt())
                .productId(review.getProduct().getProductId())
                .build();
    }

    Review patchDtoToReview(ReviewPatchDto patchDto);
}
