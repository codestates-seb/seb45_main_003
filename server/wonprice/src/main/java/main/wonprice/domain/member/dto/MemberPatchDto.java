package main.wonprice.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberPatchDto {

    private String name;

    private String phone;

    private String password;

    private String image;
}
