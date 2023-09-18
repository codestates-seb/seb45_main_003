package main.wonprice.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.LoginType;
import main.wonprice.domain.member.entity.MemberStatus;
import main.wonprice.domain.picture.entity.MemberPicture;

@Getter @Setter
@Builder
public class MemberResponseDto {

    private Long memberId;

    private String name;

    private String email;

    private String phone;

    private Long postCount;

    private Long tradeCount;

    private MemberPicture picture;
}
