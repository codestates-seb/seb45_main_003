package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.category.service.CategoryService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import main.wonprice.domain.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    /*
        상품 등록
        - createAt(등록시간): now()
     */
    @Override
    public Product save(Product product) {
        if (product.getCategory().getCategoryId() != null) {
            Category category = categoryService.findById(product.getCategory().getCategoryId());
            product.setCategory(category);
        }

        // auction(경매여부): true 일 경우에만 경매 종료일, 시작가 등록 가능 ,, 아닐 경우 null
        if (product.getAuction()) {
            product.setClosedAt(product.getClosedAt());
            product.setCurrentAuctionPrice(product.getCurrentAuctionPrice());
        }
        product.setCreateAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    // 전체 상품 조회
    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }


    // 카테고리별 전체 상품 조회
    @Override
    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findProductsByCategoryId(categoryId, pageable);
    }

    // 상품 상태 별 조회 (거래중:BEFORE, 거래완료:AFTER)
    @Override
    public Page<Product> getProductsByStatus(ProductStatus status, Pageable pageable) {
        return productRepository.findProductsByStatus(status, pageable);
    }

    // 경매 중인 상품 / 즉시 구매만 가능한 상품을 구분해서 조회
    @Override
    public Page<Product> getProductsByStatusAndAuction(ProductStatus status, boolean auction, Pageable pageable) {
        return productRepository.findProductsByStatusAndAuction(status, auction, pageable);
    }

    // 상품 제목 키워드 별로 조회
    @Override
    public Page<Product> searchProductsByTitle(String keyword, Pageable pageable) {
        return productRepository.findByTitleContaining(keyword, pageable);
    }

    /*
        특정 상품 조회
        - views(조회수): +1 씩 증가
     */
    @Override
    public Product findOneById(Long productId) {
        Product product = findExistsProduct(productId);
        product.setViews(product.getViews() + 1);
        return productRepository.save(product);
    }

    /*
        상품 게시글 삭제
        - deletedAt(삭제시간): now()
     */
    @Override
    public Product deleteOneById(Long productId, Member member) {
        Product product = findExistsProduct(productId);
        product.setDeletedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    /*
        상품 정보 수정
        - 상품을 등록한 판매자만 상품 정보 수정 가능
        - createdAt(등록시간): now()
     */
    @Override
    public Product updateOneById(Long productId, ProductRequestDto productRequestDto, Member member) {
        Product product = findExistsProduct(productId);
        product.setModifiedAt(LocalDateTime.now());
        return productRepository.save(product.update(productRequestDto));
    }

    // 상품이 존재하는지 확인하는 메서드
    @Override
    public Product findExistsProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow();
    }

//    회원이 등록한 상품 목록
    @Override
    public List<Product> findMembersProduct(Pageable pageable, Member member) {

        return productRepository.findAllBySeller(member, pageable).getContent();
    }

//    회원이 판매 완료한 상품 목록
    public List<Product> findMemberSold(Pageable pageable, Member member) {

        return productRepository.findAllBySellerAndStatus(member, ProductStatus.AFTER, pageable).getContent();
    }

//    회원이 구매 완료한 상품 목록
    @Override
    public List<Product> findMemberBought(Pageable pageable, Long memberId) {
        return productRepository.findAllByBuyerIdAndStatus(memberId, ProductStatus.AFTER, pageable).getContent();
    }
}
