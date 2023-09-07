package main.wonprice.domain.picture.entity;

import lombok.Getter;
import lombok.Setter;
import main.wonprice.domain.member.entity.Member;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@DiscriminatorValue("member")
public class MemberPicture extends Picture {

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
