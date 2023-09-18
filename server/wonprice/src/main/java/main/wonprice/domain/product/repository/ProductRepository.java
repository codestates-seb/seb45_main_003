package main.wonprice.domain.product.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    Page<Product> findAllBySeller(Member seller, Pageable pageable);

    Page<Product> findAllBySellerAndStatus(Member member, ProductStatus status, Pageable pageable);

    Page<Product> findAllByBuyerIdAndStatus(Long memberId, ProductStatus status, Pageable pageable);

    Long countProductBySeller(Member member);

    Long countProductByBuyerIdAndStatus(Long memberId, ProductStatus status);

    // 카테고리 ID를 기반으로 상품 목록 조회
//    @Query("SELECT p FROM Product p WHERE p.category.categoryId = :categoryId")
//    Page<Product> findProductsByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.categoryId = :categoryId AND p.deletedAt IS NULL")
    Page<Product> findNotDeletedProductsByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    // 상품의 상태에 따라 검색하는 메서드
    Page<Product> findProductsByStatus(ProductStatus status, Pageable pageable);

    // 경매 중인 상품/즉시 구매만 가능한 상품을 구분해서 검색하는 메서드
    Page<Product> findProductsByStatusAndAuction(ProductStatus status, boolean auction, Pageable pageable);

    // 상품 키워드 검색하는 메서드
    Page<Product> findByTitleContaining(String keyword, Pageable pageable);

    // 삭제되지 않은 모든 상품들만 조회하게 필터링 후 검색하는 메서드
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    // ㄷㅍ - 현재 시간이 경매종료 시간보다 지난 Product 조회
    List<Product> findByClosedAtIsBeforeAndStatus(LocalDateTime now, ProductStatus Status);
}
