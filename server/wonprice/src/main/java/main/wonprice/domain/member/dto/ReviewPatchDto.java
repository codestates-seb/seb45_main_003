package main.wonprice.domain.member.dto;

import lombok.Getter;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

@Getter
public class ReviewPatchDto {

    private String title;

    @Lob
    private String content;

    private Long score;
}
