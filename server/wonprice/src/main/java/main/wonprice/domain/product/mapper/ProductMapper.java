package main.wonprice.domain.product.mapper;

import main.wonprice.domain.product.dto.ProductPostDto;
import main.wonprice.domain.product.dto.ProductResponseDto;
import main.wonprice.domain.product.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    default Product postDtoToProduct(ProductPostDto postDto) {
        Product product = new Product();
        product.setTitle(postDto.getTitle());
        product.setDescription(postDto.getDescription());
        product.setImmediatelyBuyPrice(postDto.getImmediatelyBuyPrice());
        product.setViews(0L);
        return product;
    }

    default ProductResponseDto responseDtoToProduct(Product product){
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .immediatelyBuyPrice(product.getImmediatelyBuyPrice())
                .views(product.getViews())
                .createAt(product.getCreateAt())
                .modifiedAt(product.getModifiedAt())
                .deletedAt(product.getDeletedAt())
                .build();
    }

}
