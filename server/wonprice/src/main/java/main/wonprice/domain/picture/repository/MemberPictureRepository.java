package main.wonprice.domain.picture.repository;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.picture.entity.MemberPicture;
import main.wonprice.domain.picture.entity.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberPictureRepository extends JpaRepository<MemberPicture, Long> {
    MemberPicture findByMember(Member member);
}
