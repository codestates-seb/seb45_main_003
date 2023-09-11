package main.wonprice.domain.product.repository;

import main.wonprice.domain.product.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;

public class ProductSpecification {
    public static Specification<Product> notDeleted() {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.isNull(root.get("deletedAt"));
            return predicate;
        };
    }
}
