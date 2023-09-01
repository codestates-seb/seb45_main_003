package main.wonprice.domain.member.mapper;

import main.wonprice.domain.member.dto.WishPostDto;
import main.wonprice.domain.member.dto.WishResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Wish;
import main.wonprice.domain.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface WishMapper {

    default Wish toWish(Member member, Product product) {

        Wish wish = new Wish();

        wish.setProduct(product);
        wish.setMember(member);

        return wish;
    }

    default WishResponseDto toResponseDto(Wish wish) {

        WishResponseDto responseDto = new WishResponseDto();
        responseDto.setWishId(wish.getWishId());
        responseDto.setProductId(wish.getProduct().getProductId());
        responseDto.setCreatedAt(wish.getCreatedAt());

        return responseDto;
    }
    List<WishResponseDto> toResponseDtos(List<Wish> wishes);
}
