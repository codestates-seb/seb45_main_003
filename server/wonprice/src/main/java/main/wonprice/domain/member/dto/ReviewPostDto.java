package main.wonprice.domain.member.dto;

import lombok.Getter;

@Getter
public class ReviewPostDto {

    private String content;

    private Long score;

    private Long targetMemberId;
}
