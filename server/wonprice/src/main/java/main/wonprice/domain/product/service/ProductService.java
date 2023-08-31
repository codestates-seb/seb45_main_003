package main.wonprice.domain.product.service;

import main.wonprice.domain.product.dto.ProductPostDto;
import main.wonprice.domain.product.entity.Product;

public interface ProductService {
    // 로그인 기능 구현 시, 적용
    //    Long save(ProductPostDto postDto, String email);
//    Long save(ProductPostDto postDto);


    Product createProduct(Product product);


    Product getProduct(Long productId);
}
