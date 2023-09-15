package main.wonprice.domain.member.service;

import lombok.AllArgsConstructor;
import main.wonprice.auth.utils.CustomAuthorityUtils;
import main.wonprice.domain.member.dto.MemberResponseDto;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.repository.MemberRepository;
import main.wonprice.domain.product.entity.ProductStatus;
import main.wonprice.domain.product.repository.ProductRepository;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final CustomAuthorityUtils authorityUtils;

    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    public Member joinMember(Member member) {

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

//    관리자일 경우 조회한 회원 상태에 상관없이 조회 가능
    public Member findMember(Long memberId) {

        Member findMember = findVerifyMember(memberId);
        return findMember;
    }

//    관리자용 전체 회원 목록
    public Page<Member> findMembers(Pageable pageable) {
        isAdmin();
        return memberRepository.findAll(pageable);
    }
    public List<Member> findMembers() {
        isAdmin();
        return memberRepository.findAll();
    }

    public Member updateMember(Member member) {

        validateOwner(member.getMemberId());

        Member findMember = findVerifyMember(member.getMemberId());

/*        if (member.getName() != null) {
            findMember.setName(member.getName());
        }
        if (member.getPhone() != null) {
            findMember.setPhone(member.getPhone());
        }


        if (member.getImage() != null) {
            findMember.setImage(member.getImage());
        }
 */
        if (member.getPassword() != null) {
            findMember.setPassword(passwordEncoder.encode(member.getPassword()));
        }


        return findMember;
    }

    public void deleteMember(Long memberId) {

        validateOwner(memberId);

        Member findMember = findVerifyMember(memberId);
        findMember.setDeletedAt(LocalDateTime.now());
    }

//    입력한 이름으로 가입한 회원이 있는지 확인
    public void checkExistName(String name) {
        Optional<Member> findByNameMember = memberRepository.findByName(name);
        if (findByNameMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_EXISTS);
        }
    }

//    입력한 이메일으로 가입한 회원이 있는지 확인 -> 이메일로 인증 코드 요청 시 확인
    public void checkExistEmail(String email) {
        Optional<Member> findByEmailMember = memberRepository.findByEmail(email);
        if (findByEmailMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
        }
    }

//    입력한 번호로 가입한 회원이 있는지 확인
    public void checkExistPhone(String phone) {
        Optional<Member> findByPhoneMember = memberRepository.findByPhone(phone);
        if (findByPhoneMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_PHONE_EXISTS);
        }
    }

//    해당 id의 회원이 있는지 확인 후 리턴
    private Member findVerifyMember(Long memberId) {

//        Member loginMember = findLoginMember();
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
//        if (loginMember.getRoles().contains("ADMIN"))
//            return findMember.get();
        if (findMember.get().getDeletedAt() != null)
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);

        return findMember.get();
    }

//    로그인 중인 회원 정보 리턴
    public Member findLoginMember() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Member> loginMember = memberRepository.findByEmail(authentication.getName());

        if (loginMember.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHENTICATED);
        }

        return loginMember.get();
    }

    /*
     * 어드민인지 검증
     */
    public void isAdmin() {
        boolean admin = findLoginMember().getRoles().contains("ADMIN");

        if (!admin) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
    }

    public void validatePassword(String password) {
        Member loginMember = findLoginMember();

        boolean result = passwordEncoder.matches(password, loginMember.getPassword());

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD);
        }
    }

//    게시물, 리뷰, 찜 등 행위 주체와 요청을 보낸 회원이 동일한지 검증
    public void validateOwner(Long memberId) {

        Member loginMember = findLoginMember();
        if (loginMember.getRoles().contains("ADMIN")) {
            return;
        }

        boolean hasAuthority = loginMember.getMemberId().equals(memberId);
        if (!hasAuthority) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHENTICATED);
        }
    }

    public MemberResponseDto putCounts(MemberResponseDto responseDto) {

        Member member = findVerifyMember(responseDto.getMemberId());

        responseDto.setPostCount(productRepository.countProductBySeller(member));
        responseDto.setTradeCount(productRepository.countProductByBuyerIdAndStatus(member.getMemberId(), ProductStatus.AFTER));

        return responseDto;
    }


    /*
        경매 부분 product buyer_id 를 참고해서 해당 회원의 name을 가지고 오기 위한 메서드
     */
    public Member getMemberById(Long memberId){
        return memberRepository.findById(memberId).orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
