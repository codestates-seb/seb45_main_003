package main.wonprice.domain.product.service;

import lombok.RequiredArgsConstructor;
import main.wonprice.domain.member.service.MemberService;
import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }
}
