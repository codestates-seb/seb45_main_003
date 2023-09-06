package main.wonprice.domain.product.service;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Product save(Product product);

    Page<Product> findAll(Pageable pageable);

    Product findOneById(Long productId);

    Product findExistsProduct(Long productId);

    List<Product> findMembersProduct(Pageable pageable, Member member);

    Product deleteOneById(Long productId,Member loginMember);

    Product updateOneById(Long productId, ProductRequestDto productRequestDto, Member loginMember);

    public List<Product> findMembersTradedProduct(Pageable pageable, Member member);

    Page<Product> getProductsByCategory(Long categoryId, Pageable pageable);

    Page<Product> getProductsByStatus(ProductStatus status, Pageable pageable);

    Page<Product> getProductsByStatusAndAuction(ProductStatus productStatus, boolean auction, Pageable pageable);
}

