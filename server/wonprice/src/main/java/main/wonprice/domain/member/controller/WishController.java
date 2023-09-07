package main.wonprice.domain.member.controller;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.dto.WishPostDto;
import main.wonprice.domain.member.dto.WishResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.member.mapper.WishMapper;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.member.service.WishService;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.mapper.ProductMapper;
import main.wonprice.domain.product.service.ProductService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class WishController {

    private final MemberService memberService;
    private final ProductService productService;
    private final WishService wishService;
    private final WishMapper mapper;

    @PostMapping("/wishes/add")
    public ResponseEntity postWish(@RequestBody WishPostDto postDto) {

        Member loginMember = memberService.findLoginMember();
        Product product = productService.findOneById(postDto.getProductId());
        Wish wish = mapper.toWish(loginMember, product);

        wishService.addWish(wish);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }

    @GetMapping("/members/{member-id}/wishes")
    public ResponseEntity getMemberWish(Pageable pageable,
                                             @PathVariable("member-id")Long memberId) {

        Member member = memberService.findMember(memberId);

        List<Wish> wishes = wishService.findMemberWish(pageable, member);
        List<WishResponseDto> response = mapper.toResponseDtos(wishes);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/wishes/{wish-id}")
    public ResponseEntity deleteWish(@PathVariable("wish-id") Long wishId) {

        wishService.removeWish(wishId);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }
}
