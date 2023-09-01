package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    // 상품 등록
    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    // 전체 상품
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    // 특정 상품
    @Override
    public Product findOneById(Long productId) {
        Product product = findExistsProduct(productId);
        product.setViews(product.getViews() + 1); // 조회수 카운팅
        return productRepository.save(product);
    }

    // 상품이 존재하는지 확인하는 메서드
    @Override
    public Product findExistsProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow();
    }

    @Override
    public List<Product> findLoginMembersProduct(Pageable pageable, Member member) {

        return productRepository.findAllBySeller(member, pageable).getContent();
    }
}
