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

    private String name;

    private String email;

    private String password;

    private String phone;

    private String loginType;

    private LocalDateTime createdAt;

    private LocalDateTime deletedAt;

    private String roles;

    private Long reputation;

    @Column(name = "profile_image")
    private String image;

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
