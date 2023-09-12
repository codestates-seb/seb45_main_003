package main.wonprice.domain.product.mapper;

import main.wonprice.domain.category.entity.Category;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.dto.ProductRequestDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    // DTO -> Entity
    default Product toEntity(ProductRequestDto productRequestDto, Member member, Category category) {
        Product.ProductBuilder productBuilder = Product.builder()
                .seller(member)
                .category(category)
                .title(productRequestDto.getTitle())
                .description(productRequestDto.getDescription())
                .immediatelyBuyPrice(productRequestDto.getImmediatelyBuyPrice())
                .auction(productRequestDto.getAuction())
                .status(ProductStatus.BEFORE)
                .views(0L)
                .wishCount(0L)
                .buyerReview(false)
                .sellerReview(false);

        // auction이 true인 경우에만 추가 정보 설정
        if (productRequestDto.getAuction()) {
            productBuilder
                    .currentAuctionPrice(productRequestDto.getCurrentAuctionPrice())
                    .closedAt(productRequestDto.getClosedAt());
        }

        return productBuilder.build();
    }

    // Entity -> DTO
    default ProductResponseDto fromEntity(Product product) {
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .memberId(product.getSeller().getMemberId())
                .title(product.getTitle())
                .description(product.getDescription())
                .immediatelyBuyPrice(product.getImmediatelyBuyPrice())
                .productStatus(product.getStatus())
                .views(product.getViews())
                .auction(product.getAuction())
                .createAt(product.getCreateAt())
                .modifiedAt(product.getModifiedAt())
                .deletedAt(product.getDeletedAt())
                .currentAuctionPrice(product.getCurrentAuctionPrice())
                .closedAt(product.getClosedAt())
                .categoryId(product.getCategory().getCategoryId())
                .images(product.getProductPictures())
                .sellerName(product.getSeller().getName()) // 판매자 이름 설정
                .sellerReputation(product.getSeller().getReputation()) // 판매자 평판 설정
                .sellerWrittenReviewsCount(product.getSeller().getWrittenReviewsCount()) // 판매자가 쓴 리뷰 갯수
                .sellerReceivedReviewsCount(product.getSeller().getReceivedReviewsCount()) // 판매자가 받은 리뷰 갯수
                .sellerTradeCount(product.getSeller().getTradeCount()) // 판매자가 거래한 횟수
                .wishCount(product.getWishCount()) // 상품의 찜 갯수
//                .images(product.getProductPictures())
                .build();
    }

    /*
    상세페이지용 로그인 회원이 해당 상품 찜했는지 여부 포함
    Entity -> DTO
    */
    default ProductResponseDto fromEntity(Product product, Member loginMember) {
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .memberId(product.getSeller().getMemberId())
                .title(product.getTitle())
                .description(product.getDescription())
                .immediatelyBuyPrice(product.getImmediatelyBuyPrice())
                .productStatus(product.getStatus())
                .views(product.getViews())
                .auction(product.getAuction())
                .createAt(product.getCreateAt())
                .modifiedAt(product.getModifiedAt())
                .deletedAt(product.getDeletedAt())
                .currentAuctionPrice(product.getCurrentAuctionPrice())
                .closedAt(product.getClosedAt())
                .categoryId(product.getCategory().getCategoryId())
                .images(product.getProductPictures())
                .sellerName(product.getSeller().getName()) // 판매자 이름 설정
                .sellerReputation(product.getSeller().getReputation()) // 판매자 평판 설정
                .sellerWrittenReviewsCount(product.getSeller().getWrittenReviewsCount()) // 판매자가 쓴 리뷰 갯수
                .sellerReceivedReviewsCount(product.getSeller().getReceivedReviewsCount()) // 판매자가 받은 리뷰 갯수
                .sellerTradeCount(product.getSeller().getTradeCount()) // 판매자가 거래한 횟수
                .wishCount(product.getWishCount()) // 상품의 찜 갯수
//                .images(product.getProductPictures())
                .loginMembersWish(product.getWishes()
                        .stream()
                        .anyMatch(wish -> wish.getMember() == loginMember))
                .build();
    }

    List<ProductResponseDto> toMypageProduct(List<Product> products);
}
