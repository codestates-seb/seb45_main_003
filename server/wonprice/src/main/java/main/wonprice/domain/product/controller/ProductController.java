package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.category.service.CategoryService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.mapper.ProductMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import main.wonprice.domain.product.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;
    private final MemberService memberService;
    private final CategoryService categoryService;

    // 상품 등록
    @PostMapping
    public ResponseEntity createProduct(@RequestBody ProductRequestDto productRequestDto) {
        Member loginMember = memberService.findLoginMember();
        Category category = categoryService.findById(productRequestDto.getCategoryId());
        Product product = productService.save(productMapper.toEntity(productRequestDto, loginMember, category));
        ProductResponseDto productResponseDto = productMapper.fromEntity(product);
        return ResponseEntity.ok(productResponseDto);
    }

    // 전체 상품 조회
    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> findAllProduct() {
        List<ProductResponseDto> productResponseDtoList = productService
                .findAll()
                .stream()
                .map(productMapper::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(productResponseDtoList);
    }

    // 특정 상품 조회
    @GetMapping("/{productId}")
    public ResponseEntity findOnProduct(@PathVariable Long productId) {
        Product product = productService.findOneById(productId);
        ProductResponseDto productResponseDto = productMapper.fromEntity(product);
        return ResponseEntity.ok(productResponseDto);
    }

    // 상품 게시글 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(@PathVariable Long productId) {
        Member loginMember = memberService.findLoginMember();
        Product product = productService.deleteOneById(productId, loginMember);

        Long productOwnerId = product.getSeller().getMemberId();
        Long loginMemberId = loginMember.getMemberId();

        // 상품 판매자와 로그인 한 사용자가 다를 경우, 권한이 없음을 응답
        if (!productOwnerId.equals(loginMemberId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.noContent().build();
    }

    // 상품 정보 수정
    @PatchMapping("/{productId}")
    public ResponseEntity patchOneProduct(@PathVariable Long productId, @RequestBody ProductRequestDto productRequestDto) {
        Member loginMember = memberService.findLoginMember();
        Product updateProduct = productService.updateOneById(productId, productRequestDto, loginMember);

        Long productOwnerId = updateProduct.getSeller().getMemberId();
        Long loginMemberId = loginMember.getMemberId();

        // 상품 판매자와 로그인 한 사용자가 다를 경우, 권한이 없음을 응답
        if (!productOwnerId.equals(loginMemberId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ProductResponseDto productResponseDto = productMapper.fromEntity(updateProduct);
        return ResponseEntity.ok(productResponseDto);
    }
}
