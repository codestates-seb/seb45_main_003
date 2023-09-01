package main.wonprice.domain.member.controller;

import main.wonprice.domain.member.dto.MemberPatchDto;
import main.wonprice.domain.member.dto.MemberPostDto;
import main.wonprice.domain.member.dto.MemberResponseDto;
import main.wonprice.domain.member.dto.PasswordDto;
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

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final ProductService productService;
    private final MemberMapper mapper;
    private final ProductMapper productMapper;

    public MemberController(MemberService memberService, ProductService productService, MemberMapper mapper, ProductMapper productMapper) {
        this.memberService = memberService;
        this.productService = productService;
        this.mapper = mapper;
        this.productMapper = productMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberPostDto postDto) {

        Member member = mapper.postDtoToMember(postDto);
        Member createdMember = memberService.joinMember(member);
//        MemberResponseDto response = mapper.memberToResponseDto(createdMember);

        return new ResponseEntity("🌟🌟🌟 Success 🌟🌟🌟",HttpStatus.CREATED);
    }

    @GetMapping("/myPage")
    public ResponseEntity getLoginMember() {

        Member loginMember = memberService.findLoginMember();
        MemberResponseDto response = mapper.memberToResponseDto(loginMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    //    마이페이지용 로그인한 회원 게시물 목록 조회
    @GetMapping("/myPage/products")
    public ResponseEntity findLoginMembersProduct(Pageable pageable) {

        Member loginMember = memberService.findLoginMember();

        List<Product> products = productService.findLoginMembersProduct(pageable, loginMember);
        List<ProductResponseDto> response = productMapper.toMypageProduct(products);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId) {

        Member findMember = memberService.findMember(memberId);
        MemberResponseDto response = mapper.memberToResponseDto(findMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getMembers(Pageable pageable) {

        List<Member> members = memberService.findMembers(pageable);
        List<MemberResponseDto> response = mapper.membersToResponseDtos(members);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @RequestBody @Valid MemberPatchDto patchDto) {

        Member member = mapper.patchDtoToMember(patchDto);
        member.setMemberId(memberId);
        Member patchedMember = memberService.updateMember(member);

        MemberResponseDto response = mapper.memberToResponseDto(patchedMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity("Deleted Successfully", HttpStatus.NO_CONTENT);
    }

    @PostMapping("/validatePassword")
    public ResponseEntity checkPassword(@RequestBody PasswordDto passwordDto) {

        memberService.validatePassword(passwordDto.getPassword());

        return new ResponseEntity<>("Valid password", HttpStatus.OK);
    }
}
