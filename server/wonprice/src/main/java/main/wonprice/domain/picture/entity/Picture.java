package main.wonprice.domain.picture.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.product.entity.Product;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pictureId;

    private String name;

    private String path;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    /* member, product 둘 중 하나만 포함 다른 하나는 null 값으로 구분 */
}
