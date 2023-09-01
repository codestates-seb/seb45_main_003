package main.wonprice.domain.member.controller;

import main.wonprice.domain.member.dto.WishPostDto;
import main.wonprice.domain.member.dto.WishResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.member.mapper.WishMapper;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.member.service.WishService;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.service.ProductService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishes")
public class WishController {

    private final MemberService memberService;
    private final ProductService productService;
    private final WishService wishService;
    private final WishMapper mapper;

    public WishController(MemberService memberService, ProductService productService, WishService wishService, WishMapper mapper) {
        this.memberService = memberService;
        this.productService = productService;
        this.wishService = wishService;
        this.mapper = mapper;
    }

    @PostMapping("/add")
    public ResponseEntity postWish(@RequestBody WishPostDto postDto) {

        Member loginMember = memberService.findLoginMember();
        Product product = productService.findOneById(postDto.getProductId());
        Wish wish = mapper.toWish(loginMember, product);

        wishService.addWish(wish);

        return ResponseEntity.ok("🌟🌟🌟 Success 🌟🌟🌟");
    }

    @GetMapping
    public ResponseEntity getLoginMemberWish(Pageable pageable) {

        Member logimMember = memberService.findLoginMember();

        List<Wish> wishes = wishService.findMemberWish(pageable, logimMember);
        List<WishResponseDto> response = mapper.toResponseDtos(wishes);

        return ResponseEntity.ok(response);
    }
}
