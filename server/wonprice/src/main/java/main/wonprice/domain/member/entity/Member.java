package main.wonprice.domain.member.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.picture.entity.Picture;
import main.wonprice.domain.product.entity.Product;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private LoginType loginType;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private LocalDateTime deletedAt;

    @Column(nullable = false)
    private String roles;

    @Column(nullable = false)
    private Long reputation = 0L;

    @Column(nullable = true, name = "profile_image")
    private String image = null;

    @Enumerated(EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVE;

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Wish> wishs = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private Picture picture;

    @OneToMany(mappedBy = "seller")
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "seller")
    private List<ChatRoom> chatRooms = new ArrayList<>();

}
