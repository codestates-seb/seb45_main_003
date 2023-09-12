package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.category.service.CategoryService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import main.wonprice.domain.product.repository.ProductRepository;
import main.wonprice.domain.product.repository.ProductSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
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
    public Page<Product> findAll(Specification<Product> spec, Pageable pageable) {
        return productRepository.findAll(spec, pageable);
    }

    // 카테고리별 전체 상품 조회
    @Override
    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findNotDeletedProductsByCategoryId(categoryId, pageable);
    }


    // 거래 가능한 상품 중 경매 중인 상품 / 즉시 구매만 가능한 상품을 구분해서 조회 status : BEFORE
    // 삭제된 게시글은 조회되지 않게..
    @Override
    public Page<Product> getAvailableProducts(String type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));

        Specification<Product> specification = ProductSpecification.notDeletedAndStatus(ProductStatus.BEFORE);

        if ("immediatelyBuy".equalsIgnoreCase(type)) {
            specification = specification.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("auction"), false));
        } else if ("auction".equalsIgnoreCase(type)) {
            specification = specification.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("auction"), true));
        }

        return productRepository.findAll(specification, pageable);
    }

    // 거래 완료된 상품만 조회 status : AFTER
    // 삭제된 게시글은 조회되지 않게..
    @Override
    public Page<Product> getCompletedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));

        Specification<Product> specification = ProductSpecification.notDeletedAndStatus(ProductStatus.AFTER);

        return productRepository.findAll(specification, pageable);
    }

    // 상품 제목 키워드 별로 조회
    @Override
    public Page<Product> searchProductsByTitle(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("modifiedAt").nullsLast(), Sort.Order.desc("createAt")));

        Specification<Product> specification = Specification.where(ProductSpecification.notDeleted())
                .and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + keyword.toLowerCase() + "%")
                );

        return productRepository.findAll(specification, pageable);
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

    // 상품의 찜 갯수
    public Long getProductWishCount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with Id: " + productId));
        return product.getWishCount();
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

    /*
        입찰하기 요청 들어올 시
        - product 의 현재 입찰가(currentAuctionPrice), 구매자(buyerId) 셋팅
     */
    @Override
    public Product updateCurrentAuctionPrice(Long productId, Long currentAuctionPrice, Long memberId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        product.setCurrentAuctionPrice(currentAuctionPrice);
        product.setBuyerId(memberId);

        return productRepository.save(product);
    }
}
