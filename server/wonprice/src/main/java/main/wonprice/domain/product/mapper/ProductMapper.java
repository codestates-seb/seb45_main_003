package main.wonprice.domain.product.mapper;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.dto.ProductMypageResponseDto;
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
        return Product.builder()
                .seller(member)
                .title(productRequestDto.getTitle())
                .description(productRequestDto.getDescription())
                .immediatelyBuyPrice(productRequestDto.getImmediatelyBuyPrice())
                .auction(productRequestDto.getAuction())
                .status(ProductStatus.BEFORE)
                .views(0L)
                .build();
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
                .build();
    }

    List<ProductMypageResponseDto> toMypageProduct(List<Product> products);
}
