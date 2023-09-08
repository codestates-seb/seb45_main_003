package main.wonprice.domain.picture.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.picture.entity.MemberPicture;
import main.wonprice.domain.picture.entity.ProductPicture;
import main.wonprice.domain.picture.repository.PictureRepository;
import main.wonprice.domain.product.entity.Product;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PictureService {

    private final PictureRepository pictureRepository;

    public void createPicture(String imageUrl, Product product) {
        ProductPicture productPicture = new ProductPicture();
        productPicture.setProduct(product);
        productPicture.setPath(imageUrl);

        pictureRepository.save(productPicture);
    }

    public void createPicture(String imageUrl, Member member) {
        MemberPicture memberPicture = new MemberPicture();
        memberPicture.setMember(member);
        memberPicture.setPath(imageUrl);

        pictureRepository.save(memberPicture);
    }

}
