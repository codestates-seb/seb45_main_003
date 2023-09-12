package main.wonprice.domain.product.service;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.dto.BidRequestDto;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

public interface ProductService {
    Product save(Product product);

    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    Product findOneById(Long productId);

    Product findExistsProduct(Long productId);

    List<Product> findMembersProduct(Pageable pageable, Member member);

    Product deleteOneById(Long productId,Member loginMember);

    Product updateOneById(Long productId, ProductRequestDto productRequestDto, Member loginMember);

    public List<Product> findMemberSold(Pageable pageable, Member member);

    public List<Product> findMemberBought(Pageable pageable, Long memberId);

    Long getProductWishCount(Long productId);

    Page<Product> getProductsByCategory(Long categoryId, Pageable pageable);

    Page<Product> searchProductsByTitle(String keyword, int page, int size);

    Page<Product> getAvailableProducts(String type, int page, int size);

    Page<Product> getCompletedProducts(int page, int size);

    Product updateCurrentAuctionPrice(Long productId, BidRequestDto request);
}

