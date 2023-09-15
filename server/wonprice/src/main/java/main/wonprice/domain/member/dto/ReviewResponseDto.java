package main.wonprice.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import main.wonprice.domain.picture.entity.ProductPicture;

import javax.persistence.Lob;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {

    private Long reviewId;

    private String postMemberName;

    private String title;

    private List<ProductPicture> productImages;

    private String reviewTitle;

    @Lob
    private String content;

    private Long score;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

    private Long productId;
}
