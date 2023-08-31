package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
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
        product.setViews(product.getViews() + 1); // 조회수 카운팅 (메서드 추가!)
        return productRepository.save(product);
    }

    // 상품이 존재하는지 확인하는 메서드
    @Override
    public Product findExistsProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow();
    }

    @Override
    public Product deleteOneById(Long productId) {
        Product product = findOneById(productId);
        product.setRemoved(true);
        return productRepository.save(product);
    }
}
