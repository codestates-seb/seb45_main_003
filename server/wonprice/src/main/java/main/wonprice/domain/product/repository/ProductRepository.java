package main.wonprice.domain.product.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllBySeller(Member seller, Pageable pageable);

    Page<Product> findAllByBuyerIdAndStatus(Long memberId, ProductStatus status, Pageable pageable);

    int countProductBySeller(Member member);

    int countProductByBuyerIdAndStatus(Long memberId, ProductStatus status);
}
