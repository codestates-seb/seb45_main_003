package main.wonprice.domain.product.repository;

import main.wonprice.domain.product.entity.Product;
import main.wonprice.domain.product.entity.ProductStatus;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;

public class ProductSpecification {
    public static Specification<Product> notDeleted() {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.isNull(root.get("deletedAt"));
            return predicate;
        };
    }

    public static Specification<Product> notDeletedAndStatus(ProductStatus status) {
        return (root, query, criteriaBuilder) -> {
            Predicate deletedPredicate = criteriaBuilder.isNull(root.get("deletedAt"));
            Predicate statusPredicate = criteriaBuilder.equal(root.get("status"), status);
            return criteriaBuilder.and(deletedPredicate, statusPredicate);
        };
    }
}
