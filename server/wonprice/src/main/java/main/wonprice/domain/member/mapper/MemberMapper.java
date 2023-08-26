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

    List<MemberResponseDto> membersToResponseDtos(List<Member> members);

    Member patchDtoToMember(MemberPatchDto patchDto);

    MemberResponseDto memberToResponseDto(Member member);
}
