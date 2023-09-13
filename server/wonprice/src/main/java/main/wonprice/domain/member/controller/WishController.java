package main.wonprice.domain.member.controller;

import lombok.AllArgsConstructor;
import main.wonprice.domain.member.dto.WishDeleteDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
    private final ProductMapper productMapper;

    @PostMapping("/wishes/add")
    public ResponseEntity postWish(@RequestBody WishPostDto postDto) {

        Member loginMember = memberService.findLoginMember();
        Product product = productService.findOneById(postDto.getProductId());
        Wish wish = mapper.toWish(loginMember, product);

        wishService.addWish(wish);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }

    @GetMapping("/members/{member-id}/wishes")
    public ResponseEntity getMemberWish(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size,
                                        @PathVariable("member-id")Long memberId) {

        Pageable pageable = PageRequest.of(page, size);

        Member member = memberService.findMember(memberId);

        Page<Wish> wishes = wishService.findMemberWish(pageable, member);
        Page<WishResponseDto> response = wishes.map(mapper::toResponseDto);
        response.forEach(
                dto -> dto.setProductResponseDto(productMapper.fromEntity(productService.findOneById(dto.getProductId()))));

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/wishes/{product-id}")
    public ResponseEntity deleteWishByProductId(@PathVariable("product-id") Long productId) {

        wishService.removeWish(productId);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }

    @PatchMapping("/wishes")
    public ResponseEntity deleteWishes(@RequestBody WishDeleteDto deleteDto) {

        List<Boolean> checkBox = deleteDto.getCheckBox();

        wishService.removeWishes(checkBox);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }
}
