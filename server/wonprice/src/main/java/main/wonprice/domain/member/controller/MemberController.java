package main.wonprice.domain.member.controller;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.dto.*;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.mapper.MemberMapper;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.mapper.ProductMapper;
import main.wonprice.domain.product.service.ProductService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/members")
@AllArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final ProductService productService;
    private final MemberMapper mapper;
    private final ProductMapper productMapper;

//    회원 가입
    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberPostDto postDto) {

        Member member = mapper.postDtoToMember(postDto);
        Member createdMember = memberService.joinMember(member);
//        MemberResponseDto response = mapper.memberToResponseDto(createdMember);

        return new ResponseEntity("🌟🌟🌟 Success 🌟🌟🌟",HttpStatus.CREATED);
    }

//    프로필 정보 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getProfile(@PathVariable("member-id") Long memberId) {

        Member member = memberService.findMember(memberId);
        MemberResponseDto response = memberService.putCounts(mapper.memberToResponseDto(member));

        return new ResponseEntity(response, HttpStatus.OK);
    }

    //    회원 게시물 목록 조회
    @GetMapping("/{member-id}/products")
    public ResponseEntity findMembersProduct(Pageable pageable,
                                                  @PathVariable("member-id") Long memberId) {

        Member member = memberService.findMember(memberId);

        List<Product> products = productService.findMembersProduct(pageable, member);
        List<ProductResponseDto> response = productMapper.toMypageProduct(products);

        return ResponseEntity.ok(response);
    }

    //    거래 완료 목록 조회
    @GetMapping("/{member-id}/purchase")
    public ResponseEntity findMembersPurchase(Pageable pageable,
                                              @PathVariable("member-id") Long memberId) {

        Member member = memberService.findMember(memberId);
        List<Product> products = productService.findMembersTradedProduct(pageable, member);
        List<ProductResponseDto> response = productMapper.toMypageProduct(products);

        return ResponseEntity.ok(response);
    }

//    회원 목록 조회
    @GetMapping("/all")
    public ResponseEntity getMembers(Pageable pageable) {

        List<Member> members = memberService.findMembers(pageable);
        List<MemberResponseDto> response = mapper.membersToResponseDtos(members);

        return new ResponseEntity(response, HttpStatus.OK);
    }

//    회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @RequestBody @Valid MemberPatchDto patchDto) {

        Member member = mapper.patchDtoToMember(patchDto);
        member.setMemberId(memberId);
        Member patchedMember = memberService.updateMember(member);

        MemberResponseDto response = mapper.memberToResponseDto(patchedMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }

//    회원 탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity("Deleted Successfully", HttpStatus.NO_CONTENT);
    }

//    비밀번호 인증
    @PostMapping("/auth/password")
    public ResponseEntity checkPassword(@RequestBody AuthPasswordDto passwordDto) {

        memberService.validatePassword(passwordDto.getPassword());

        return new ResponseEntity<>("🌟🌟🌟 Success 🌟🌟🌟", HttpStatus.OK);
    }

//    중복 이름 검증
    @PostMapping("/auth/name")
    public ResponseEntity checkName(@RequestBody Map<String, String> name) {

        String inputName = name.get("name");
        memberService.checkExistName(inputName);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }

//    중복 번호 검증
    @PostMapping("/auth/phone")
    public ResponseEntity checkPhone(@RequestBody Map<String, String> phone) {

        String inputPhone = phone.get("phone");
        memberService.checkExistPhone(inputPhone);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }
}
