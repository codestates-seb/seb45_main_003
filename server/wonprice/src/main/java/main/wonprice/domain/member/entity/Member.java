package main.wonprice.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.wonprice.domain.chat.entity.ChatParticipant;
import main.wonprice.domain.picture.entity.MemberPicture;
import main.wonprice.domain.product.entity.Bid;
import main.wonprice.domain.product.entity.Product;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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

//    @Column(nullable = false, unique = true)
//    private String phone;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime deletedAt;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false)
    private Long reputation = 0L;

    @OneToMany(mappedBy = "receiveMember")
    private List<Review> receiveReviews = new ArrayList<>();

    @OneToMany(mappedBy = "postMember")
    private List<Review> postReviews = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Wish> wishs = new ArrayList<>();

//    @OneToOne(mappedBy = "member")
//    private Picture picture;

    @OneToMany(mappedBy = "seller")
    private List<Product> products = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private MemberPicture picture; // 프로필 이미지

    @OneToMany(mappedBy = "member")
    private List<ChatParticipant> chatParticipant = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Notification> notifications = new ArrayList<>();

//    @OneToMany(mappedBy = "seller")
//    private List<ChatRoom> chatRooms = new ArrayList<>();

    public Member(String name, String email) {
        this.name = name;
        this.email = email;
    }

    @Column(nullable = false)
    private Long writtenReviewsCount = 0L; // 사용자가 작성한 리뷰 개수

    @Column(nullable = false)
    private Long receivedReviewsCount = 0L; // 사용자가 받은 리뷰 개수

    @Column(nullable = false)
    private Long tradeCount = 0L; // 거래 완료 횟수
}
