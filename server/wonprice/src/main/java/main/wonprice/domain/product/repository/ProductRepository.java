package main.wonprice.domain.product.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllBySeller(Member seller, Pageable pageable);

    // 카테고리 ID를 기반으로 상품 목록 조회
    @Query("SELECT p FROM Product p WHERE p.category.categoryId = :categoryId")
    Page<Product> findProductsByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    // 상품의 상태에 따라 검색하는 메서드
    Page<Product> findProductsByStatus(ProductStatus status, Pageable pageable);
}
