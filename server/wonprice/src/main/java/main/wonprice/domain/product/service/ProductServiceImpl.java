package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    /*
        상품 등록
        - createAt(등록시간): now()
     */
    @Override
    public Product save(Product product) {
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
    public List<Product> findAll() {
        return productRepository.findAll();
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
    public Product deleteOneById(Long productId) {
        Product product = findOneById(productId);
        product.setDeletedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    // 상품이 존재하는지 확인하는 메서드
    @Override
    public Product findExistsProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow();
    }
}
