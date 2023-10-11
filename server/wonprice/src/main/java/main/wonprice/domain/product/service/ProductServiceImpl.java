package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.category.service.CategoryService;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.chat.entity.RoomStatus;
import main.wonprice.domain.chat.service.ChatService;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.member.service.NotificationService;
import main.wonprice.domain.product.dto.BidRequestDto;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.entity.Bid;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import main.wonprice.domain.product.repository.BidRepository;
import main.wonprice.domain.product.repository.ProductRepository;
import main.wonprice.domain.product.repository.ProductSpecification;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final MemberService memberService;
    private final NotificationService notificationService;
    private final BidRepository bidRepository;

    private final ChatService chatService;

    // [예외처리 및 리팩토링 완료] 상품 등록
    @Override
    public Product save(Product product) {
        // [상품의 카테고리가 존재하고, category_id가 null이 아닐 경우] 카테고리 등록
        if (product.getCategory().getCategoryId() != null) {
            Category category = categoryService.findById(product.getCategory().getCategoryId());
            product.setCategory(category);
        }

        // 상품 등록 시, [즉시구매가 >= 10억 일 경우] 예외처리
        if (product.getImmediatelyBuyPrice() >= 1_000_000_000) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_INVALID_PRICE);
        }

        // 경매 상품 등록 시, [auction(경매여부): true 일 경우] 경매 종료일, 시작가 등록
        if (product.getAuction()) {
            product.setClosedAt(product.getClosedAt());
            product.setCurrentAuctionPrice(product.getCurrentAuctionPrice());
        }

        // 경매 상품 등록 시, [즉시 구매 가 <= 시작가 일 경우] 예외처리
        if (product.getAuction() && product.getImmediatelyBuyPrice() <= product.getCurrentAuctionPrice()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_AUCTION_IMMEDIATELY_CURRENT_INVALID_PRICE);
        }

        product.setCreatedAt(LocalDateTime.now());

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
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt")));

        Specification<Product> specification = ProductSpecification.notDeletedAndStatus(ProductStatus.BEFORE);

        if ("immediatelyBuy".equalsIgnoreCase(type)) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.and(
                            criteriaBuilder.equal(root.get("auction"), false),
                            criteriaBuilder.equal(root.get("status"), ProductStatus.BEFORE)
                    )
            );
        } else if ("auction".equalsIgnoreCase(type)) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.and(
                            criteriaBuilder.equal(root.get("auction"), true),
                            criteriaBuilder.equal(root.get("status"), ProductStatus.BEFORE)
                    )
            );
        }else {
            // "all" 이나 다른 유효하지 않은 값의 경우에도 "before" 상태만 고려
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("status"), ProductStatus.BEFORE)
            );
        }

        return productRepository.findAll(specification, pageable);
    }

    // 거래 완료된 상품만 조회 status : AFTER
    // 삭제된 게시글은 조회되지 않게..
    @Override
    public Page<Product> getCompletedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt")));

        Specification<Product> specification = ProductSpecification.notDeletedAndStatus(ProductStatus.AFTER);

        return productRepository.findAll(specification, pageable);
    }

    // 상품 제목 키워드 별로 조회
    @Override
    public Page<Product> searchProductsByTitle(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt")));

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

    // [예외처리 및 리팩토링 완료] 상품 정보 수정
    @Override
    public Product updateOneById(Long productId, ProductRequestDto productRequestDto) {
        Member member = memberService.findLoginMember();

        Product product = findExistsProduct(productId);
        product.setModifiedAt(LocalDateTime.now());

        // 상품 정보 수정 시, [로그인 회원 != 상품 판매자 일 경우] 예외처리
        if (!product.getSeller().getMemberId().equals(member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_SELLER_NOT_SAME);
        }

        // 경매 상품 수정 시, [입찰자가 존재할 경우] 예외처리
        if (product.getAuction() && product.getBuyerId() != null) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_AUCTION_INVALID_MODIFIED);
        }

        // [상품 상태가 BEFORE 일 경우에만 수정 가능]하게 예외처리
        if (!product.getStatus().equals(ProductStatus.BEFORE)) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_STATUS_INVALID);
        }

        notificationService.createdNotificationWithWishProduct(product);
        return productRepository.save(product.update(productRequestDto));
    }

    // [예외처리 및 리팩토링 완료] 상품이 존재하는지 확인하는 메서드
    @Override
    public Product findExistsProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    // 상품의 찜 갯수
    public Long getProductWishCount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with Id: " + productId));
        return product.getWishCount();
    }

    //    회원이 등록한 상품 목록
    @Override
    public Page<Product> findMembersProduct(Pageable pageable, Member member) {

        return productRepository.findAllBySellerAndDeletedAt(member, pageable, null);
    }

    //    회원이 판매 완료한 상품 목록
    public Page<Product> findMemberSold(Pageable pageable, Member member) {

        return productRepository.findAllBySellerAndStatusAndDeletedAt(member, ProductStatus.AFTER, pageable, null);
    }

    //    회원이 구매 완료한 상품 목록
    @Override
    public Page<Product> findMemberBought(Pageable pageable, Long memberId) {
        return productRepository.findAllByBuyerIdAndStatusAndDeletedAt(memberId, ProductStatus.AFTER, pageable, null);
    }

    // [리팩토링 전] 입찰
    @Override
    public Product updateCurrentAuctionPrice(Long productId, BidRequestDto request) {
        // 존재하지 않는 상품일 경우 예외 처리
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        // 거래가 성사된 상품에 대한 입찰하기 예외처리
        if (product.getStatus().equals(ProductStatus.TRADE)) {
            throw new BusinessLogicException(ExceptionCode.BID_CLOSE);
        }

        // 판매자와 입찰자가 같을 경우 예외 처리
        if (product.getSeller().getMemberId() == request.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.SELLER_AND_BUYER_ARE_SAME);
        }

        // 내가 요청한 입찰가와 현재 상품의 입찰가 비교
        Long requestedBidPrice = request.getCurrentAuctionPrice();
        Long currentProductBidPrice = product.getCurrentAuctionPrice();

        /*
            #1 입찰가 유효성 검사
            - 제시한 입찰가는 현재 상품 입찰가보다 낮은 가격일 수 없다.
         */
        if (requestedBidPrice < currentProductBidPrice) {
            throw new BusinessLogicException(ExceptionCode.BID_PRICE_LOW_INVALID);
        }

        /*
            #2 입찰가 유효성 검사
            - 셋팅된 buyer가 없는 경우
            -- 제시한 입찰가는 현재 상품 입찰가와 같거나 크면 된다.

            - 셋팅된 buyer가 있는 경우
            -- 제시한 입찰가는 현재 상품 입찰가보다 5% 이상이어야 한다.
         */
        if (product.getBuyerId() == null) {
            if (requestedBidPrice < currentProductBidPrice) {
                throw new BusinessLogicException(ExceptionCode.BID_PRICE_LOW_INVALID);
            }
        } else {
            if (requestedBidPrice < (currentProductBidPrice * 1.05)) {
                throw new BusinessLogicException(ExceptionCode.BID_PRICE_HIGH_INVALID);
            }
        }

        /*
            #3 입찰가 유효성 검사
            - 입찰 가격 == 즉시구매 일 경우
            -- 상품 상태 TRADE 변경
            -- 채팅방 생성 **
         */

        product.setCurrentAuctionPrice(request.getCurrentAuctionPrice());
        product.setBuyerId(request.getMemberId());


        if (requestedBidPrice.equals(product.getImmediatelyBuyPrice())) {
            if (!product.getStatus().equals(ProductStatus.TRADE)) {
                chatService.createChatRoom(product);
                product.setStatus(ProductStatus.TRADE);
            }
        }


        // #5 입찰가 유효성 검사
        // - 입찰가 > 즉시구매가 입력할 경우 예외처리
        if (requestedBidPrice > product.getImmediatelyBuyPrice()) {
            throw new BusinessLogicException(ExceptionCode.BID_PRICE_INVALID);
        }



        return productRepository.save(product);
    }


    // 대표 - 채팅방 안에서 "거래 완료" 버튼 클릭 시 해당 Product AFTER로 Update
    @Override
    @Transactional
    public void updateCompletedProduct(Long productId, ChatRoom chatRoom) {
        Product findProduct = productRepository.findById(productId).orElseThrow();

        chatRoom.setStatus(RoomStatus.CLOSE);

        findProduct.getSeller().setTradeCount(findProduct.getSeller().getTradeCount() + 1);

        findProduct.setStatus(ProductStatus.AFTER);
    }

    // 대표 - 현재 시간이 경매 종료 시간을 지났을 경우 해당 값을 찾기 위한 로직
    @Override
    public List<Product> getCompletedAuction() {
        List<Product> checkCompletedAuction = productRepository.findByClosedAtIsBeforeAndStatus(LocalDateTime.now(), ProductStatus.BEFORE);

        return checkCompletedAuction;
    }

    // 대표 - 즉시구매
    @Override
    @Transactional
    public Product immediatelyBuy(Long productId, Member member) {
        Product findProduct = findExistsProduct(productId);

        if(findProduct.getStatus().equals(ProductStatus.TRADE)){
            throw new BusinessLogicException(ExceptionCode.BID_CLOSE);
        }

        /* buyer == seller일 경우 구매 못하게 막는 로직 필요 */
        if(findProduct.getSeller().getMemberId() == member.getMemberId()){
            throw new BusinessLogicException(ExceptionCode.IMMEDIATELY_INVALID);
        }

        findProduct.setCurrentAuctionPrice(findProduct.getImmediatelyBuyPrice());
        findProduct.setBuyerId(member.getMemberId());
        findProduct.setStatus(ProductStatus.TRADE);

        return findProduct;
    }

    //    회원 입찰 목록
    @Override
    public Page<Product> findMembersBidProducts(Pageable pageable, Long memberId) {

        Page<Bid> bids = bidRepository.findAllByMemberMemberId(pageable, memberId);

//        return bids.map(bid -> productRepository.findByProductIdAndStatus(bid.getProduct().getProductId(), ProductStatus.BEFORE));
        List<Product> products =
                bids.map(Bid::getProduct)
                        .stream()
                        .filter(product -> product.getStatus() == ProductStatus.BEFORE)
                        .collect(Collectors.toList());

        return new PageImpl<>(products, pageable, pageable.getPageSize());
    }

    @Override
    public Long getMembersProductCount(Member member) {
        return productRepository.countProductBySeller(member);
    }
}
