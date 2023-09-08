package main.wonprice.domain.category.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.product.entity.Product;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String name;

    @OneToMany(mappedBy = "category")
    private List<Product> products = new ArrayList<>();
}