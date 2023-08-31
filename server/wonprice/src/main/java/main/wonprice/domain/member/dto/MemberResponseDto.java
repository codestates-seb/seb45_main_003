package main.wonprice.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.LoginType;
import main.wonprice.domain.member.entity.MemberStatus;

@Getter @Setter
public class MemberResponseDto {

    private Long memberId;

    private String name;

    private String email;

    private String phone;

    private MemberStatus status;
}
