package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.category.service.CategoryService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.picture.service.PictureService;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import main.wonprice.domain.product.mapper.ProductMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import main.wonprice.domain.product.service.ProductService;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;
    private final MemberService memberService;
    private final CategoryService categoryService;
    private final PictureService pictureService;

    // 상품 등록
    @PostMapping
    public ResponseEntity createProduct(@RequestBody ProductRequestDto productRequestDto) {
        Member loginMember = memberService.findLoginMember();
        Category category = categoryService.findById(productRequestDto.getCategoryId());
        Product product = productService.save(productMapper.toEntity(productRequestDto, loginMember, category));

        /* 대표 */
        for (String imageUrl : productRequestDto.getImages()) {
            log.info("imageUrl" + imageUrl);
            pictureService.createPicture(imageUrl, product);
        }
        /* 대표 */

        ProductResponseDto productResponseDto = productMapper.fromEntity(product);
        return ResponseEntity.ok(productResponseDto);
    }

    // 전체 상품 조회
    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> findAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));
        Page<ProductResponseDto> productResponseDtoList = productService
                .findAll(pageable)
                .map(productMapper::fromEntity);

        return ResponseEntity.ok(productResponseDtoList);
    }

    // 카테고리 별로 전체 상품 조회
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponseDto>> getProductCategory(@PathVariable Long categoryId,
                                                                       @RequestParam(defaultValue = "0") int page,
                                                                       @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));
        Page<Product> products = productService.getProductsByCategory(categoryId, pageable);
        Page<ProductResponseDto> productResponseDtoList = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoList);
    }

    // 거래 가능한 상품만 조회
    @GetMapping("/available")
    public ResponseEntity<Page<ProductResponseDto>> getAvailableProducts(
            @RequestParam(name = "type", defaultValue = "all") String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));

        Page<Product> products;

        if ("immediatelyBuy".equalsIgnoreCase(type)) { // 즉시 구매만 가능한 상품을 조회하는 경우: "products/available?type=immediatelyBuy"
            products = productService.getProductsByStatusAndAuction(ProductStatus.BEFORE, false, pageable);
        } else if ("auction".equalsIgnoreCase(type)) { // 경매중인 상품을 조회하는 경우: "products/available?type=auction"
            products = productService.getProductsByStatusAndAuction(ProductStatus.BEFORE, true, pageable);
        } else { // 모든 거래가 가능한 상품을 조회하는 경우: "products/available?type=all"
            products = productService.getProductsByStatus(ProductStatus.BEFORE, pageable);
        }

        Page<ProductResponseDto> productResponseDtoPage = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoPage);
    }

    // 거래 완료된 상품만 조회
    @GetMapping("/completed")
    public ResponseEntity<Page<ProductResponseDto>> getCompletedProducts(@RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));
        // ProductStatus가 AFTER인 상품만 조회
        Page<Product> products = productService.getProductsByStatus(ProductStatus.AFTER, pageable);
        Page<ProductResponseDto> productResponseDtoList = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoList);
    }

    // 특정 상품 조회
    @GetMapping("/{productId}")
    public ResponseEntity findOnProduct(@PathVariable Long productId) {
        Product product = productService.findOneById(productId);

        log.info("product : " + product.getProductPictures());

        ProductResponseDto productResponseDto = productMapper.fromEntity(product);
        return ResponseEntity.ok(productResponseDto);
    }

    // 상품 title 키워드로 검색
    // Example URL: "/products/search?keyword=자켓"
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponseDto>> searchProductsByTitle(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));
        Page<Product> products = productService.searchProductsByTitle(keyword, pageable);
        Page<ProductResponseDto> productResponseDtoList = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoList);
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
