package main.wonprice.domain.product.controller;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.dto.ProductPostDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.mapper.ProductMapper;
import main.wonprice.domain.product.service.ProductService;
import main.wonprice.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    // 상품 등록
    @PostMapping("/register")
    public ResponseEntity postProduct(@RequestBody ProductPostDto postDto) {
        Product product = productService.createProduct(productMapper.postDtoToProduct(postDto));
        URI location = UriCreator.createUri("/products", product.getProductId());
        return ResponseEntity.created(location).body(product);
    }

    // 상품 상세 정보 페이지로 이동
    @GetMapping("/list/{productId}")
    public ResponseEntity productDetailsPage(@PathVariable("productId") @Positive Long productId) {
        // 조회할 판매 상품 select
        Product product = productService.getProduct(productId);
        ProductResponseDto productResponseDto = productMapper.responseDtoToProduct(product);

        return new ResponseEntity(productResponseDto, HttpStatus.OK);
    }
}
