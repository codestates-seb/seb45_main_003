package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.mapper.ProductMapper;
import main.wonprice.domain.product.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;
    private final MemberService memberService;

    // 상품 등록
    @PostMapping("/post")
    public ResponseEntity createProduct(@RequestBody ProductRequestDto productRequestDto) {
        Member loginMember = memberService.findLoginMember();
        Product product = productService.save(productMapper.toEntity(productRequestDto, loginMember));
        ProductResponseDto productResponseDto = productMapper.fromEntity(product);
        return ResponseEntity.ok(productResponseDto);
    }
}
