package main.wonprice.domain.member.mapper;

import main.wonprice.domain.member.dto.MemberPatchDto;
import main.wonprice.domain.member.dto.MemberPostDto;
import main.wonprice.domain.member.dto.MemberResponseDto;
import main.wonprice.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member postDtoToMember(MemberPostDto postDto);

    Member patchDtoToMember(MemberPatchDto patchDto);


    default MemberResponseDto memberToResponseDto(Member member) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .tradeCount(member.getTradeCount())
                .picture(member.getPicture())
                .build();
    }
    default MemberResponseDto memberToResponseDto(Member member, Long productCount) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .postCount(productCount)
                .tradeCount(member.getTradeCount())
                .picture(member.getPicture())
                .build();
    }
}
