package main.wonprice.domain.product.mapper;

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
    default Product toEntity(ProductRequestDto productRequestDto, Member member) {
        Product.ProductBuilder productBuilder = Product.builder()
                .seller(member)
                .title(productRequestDto.getTitle())
                .description(productRequestDto.getDescription())
                .immediatelyBuyPrice(productRequestDto.getImmediatelyBuyPrice())
                .auction(productRequestDto.getAuction())
                .status(ProductStatus.BEFORE)
                .views(0L);

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
                .build();
    }

    List<ProductResponseDto> toMypageProduct(List<Product> products);
}
