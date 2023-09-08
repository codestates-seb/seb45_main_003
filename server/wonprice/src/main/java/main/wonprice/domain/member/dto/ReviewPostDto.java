package main.wonprice.domain.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReviewPostDto {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private Long score;

    @NotBlank
    private Long targetMemberId;

    @NotBlank
    private Long productId;
}
