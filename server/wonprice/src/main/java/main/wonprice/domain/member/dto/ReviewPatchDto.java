package main.wonprice.domain.member.dto;

import lombok.Getter;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

@Getter
public class ReviewPatchDto {

    @NotBlank
    private Long reviewId;

    @Lob
    @NotBlank
    private String content;
}
