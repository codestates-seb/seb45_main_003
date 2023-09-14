package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.auth.jwt.service.JwtService;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.category.service.CategoryService;
import main.wonprice.domain.chat.service.ChatService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.picture.service.PictureService;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.mapper.ProductMapper;
import main.wonprice.domain.product.repository.ProductSpecification;
import main.wonprice.exception.BusinessLogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
    private final ChatService chatService;
    private final JwtService jwtService;


    // 상품 등록
    @PostMapping
    public ResponseEntity createProduct(@RequestBody ProductRequestDto productRequestDto) {
        try {
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
        } catch (BusinessLogicException ex) {
            return ResponseEntity.badRequest().body(ex.getExceptionCode().getMessage());
        }
    }

    // 전체 상품 조회
    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> findAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createdAt")));

        // 삭제되지 않은 상품만 검색하도록 스펙을 적용
        Specification<Product> spec = ProductSpecification.notDeleted();

        Page<ProductResponseDto> productResponseDtoList = productService
                .findAll(spec, pageable)
                .map(productMapper::fromEntity);

        return ResponseEntity.ok(productResponseDtoList);
    }

    // 카테고리 별로 전체 상품 조회
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponseDto>> getProductCategory(@PathVariable Long categoryId,
                                                                       @RequestParam(defaultValue = "0") int page,
                                                                       @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createdAt")));

        Page<Product> products = productService.getProductsByCategory(categoryId, pageable);

        Page<ProductResponseDto> productResponseDtoList = products.map(productMapper::fromEntity);

        return ResponseEntity.ok(productResponseDtoList);
    }

    // 거래 가능한 상품만 조회
    // 그 중에서도 경매중, 즉시구매, 모든 거래 가능한 상품 별로 조회 가능 * 서비스 로직에서 구현돼 있음
    @GetMapping("/available")
    public ResponseEntity<Page<ProductResponseDto>> getAvailableProducts(
            @RequestParam(name = "type", defaultValue = "all") String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.getAvailableProducts(type, page, size);
        Page<ProductResponseDto> productResponseDtoPage = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoPage);
    }


    // 거래 완료된 상품만 조회
    @GetMapping("/completed")
    public ResponseEntity<Page<ProductResponseDto>> getCompletedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.getCompletedProducts(page, size);
        Page<ProductResponseDto> productResponseDtoPage = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoPage);
    }

    // 특정 상품 조회
    @GetMapping("/{productId}")
    public ResponseEntity findOnProduct(@PathVariable Long productId,
                                        @RequestHeader(name = "Authorization", required = false) String accessToken) {
        Product product = productService.findOneById(productId);

        log.info("product : " + product.getProductPictures());

        if (jwtService.isLogin(accessToken)) {
            ProductResponseDto productResponseDto = productMapper.fromEntity(product, memberService.findLoginMember());
            return ResponseEntity.ok(productResponseDto);
        } else {
            ProductResponseDto productResponseDto = productMapper.fromEntity(product);
            return ResponseEntity.ok(productResponseDto);
        }
    }

    // 상품 title 키워드로 검색
    // Example URL: "/products/search?keyword=자켓"
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponseDto>> searchProductsByTitle(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.searchProductsByTitle(keyword, page, size);
        Page<ProductResponseDto> productResponseDtoPage = products.map(productMapper::fromEntity);
        return ResponseEntity.ok(productResponseDtoPage);
    }

    // 상품 게시글 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(@PathVariable Long productId) {
        Member loginMember = memberService.findLoginMember();
        Product product = productService.findOneById(productId);

        Long productOwnerId = product.getSeller().getMemberId();
        Long loginMemberId = loginMember.getMemberId();

        // 상품 판매자와 로그인 한 사용자가 다를 경우, 권한이 없음을 응답
        if (!productOwnerId.equals(loginMemberId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("게시글을 삭제할 권한이 없습니다.");
        }

        // 경매 상품인 경우, buyer_id가 있는지 확인하여 삭제 여부 결정
        if (product.getAuction() && product.getBuyerId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("경매가 진행 중인 상품은 삭제할 수 없습니다.");
        }

        // 삭제가 가능한 경우, 상품 삭제
        productService.deleteOneById(productId, loginMember);

        return ResponseEntity.noContent().build();
    }

    // 상품 정보 수정
    @PatchMapping("/{productId}")
    public ResponseEntity patchOneProduct(@PathVariable Long productId, @RequestBody ProductRequestDto productRequestDto) {
        try {
            Product updateProduct = productService.updateOneById(productId, productRequestDto);
            ProductResponseDto productResponseDto = productMapper.fromEntity(updateProduct);
            return ResponseEntity.ok(productResponseDto);
        } catch (BusinessLogicException ex) {
            return ResponseEntity.badRequest().body(ex.getExceptionCode().getMessage());
        }
    }

    // 대표 - 즉시구매
    @PostMapping("/buy/{productId}")
    public ResponseEntity buyProduct(@PathVariable Long productId) {
        Member buyer = memberService.findLoginMember();

        /* buyer == seller일 경우 구매 못하게 막는 로직 필요 */

        Product product = productService.immediatelyBuy(productId, buyer);
        Long chatRoomId = chatService.createChatRoom(product.getProductId());

        chatService.insertChatParticipant(chatRoomId, product.getSeller());
        chatService.insertChatParticipant(chatRoomId, buyer);

        return new ResponseEntity(HttpStatus.OK);
    }
}
