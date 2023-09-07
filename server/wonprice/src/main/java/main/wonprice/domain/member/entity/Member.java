package main.wonprice.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.picture.entity.MemberPicture;
import main.wonprice.domain.picture.entity.Picture;
import main.wonprice.domain.product.entity.Product;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private LocalDateTime deletedAt;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false)
    private Long reputation = 0L;

    @Column(nullable = true, name = "profile_image")
    private String image = null;

    @OneToMany(mappedBy = "postMember")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Wish> wishs = new ArrayList<>();

//    @OneToOne(mappedBy = "member")
//    private Picture picture;

    @OneToMany(mappedBy = "seller")
    private List<Product> products = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private MemberPicture memberPicture; // 프로필 이미지

//    @OneToMany(mappedBy = "seller")
//    private List<ChatRoom> chatRooms = new ArrayList<>();

    public Member(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
