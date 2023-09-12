package main.wonprice.domain.member.dto;

import lombok.Getter;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

@Getter
public class ReviewPatchDto {

    @Lob
    @NotBlank
    private String content;

    private Long score;
}
