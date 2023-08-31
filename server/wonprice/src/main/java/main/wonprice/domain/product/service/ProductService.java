package main.wonprice.domain.product.service;

import main.wonprice.domain.product.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product save(Product product);
    List<Product> findAll();
    Optional<Product> findOneById(Long productId);
}
