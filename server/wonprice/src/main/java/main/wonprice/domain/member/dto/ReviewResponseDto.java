package main.wonprice.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter @Setter
public class ReviewResponseDto {

    private Long reviewId;

    private Long postMemberId;

    private Long targetMemberId;

    private Long productId;

    private String title;

    @Lob
    private String content;

    private Long score;

    private LocalDateTime createdAt;
}
