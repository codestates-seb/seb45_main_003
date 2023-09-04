package main.wonprice.domain.member.service;

import main.wonprice.auth.utils.CustomAuthorityUtils;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.MemberStatus;
import main.wonprice.domain.member.repository.MemberRepository;
import main.wonprice.exception.BusinessLogicException;
import main.wonprice.exception.ExceptionCode;
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
public class MemberService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    public MemberService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

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
    public List<Member> findMembers(Pageable pageable) {
        return memberRepository.findAll(pageable).getContent();
    }

    public Member updateMember(Member member) {

        Member loginMember = findLoginMember();

        if (!loginMember.getMemberId().equals(member.getMemberId()) & !loginMember.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
        }

        Member findMember = findVerifyMember(member.getMemberId());

        if (member.getName() != null) {
            findMember.setName(member.getName());
        }
        if (member.getPhone() != null) {
            findMember.setPhone(member.getPhone());
        }
        if (member.getPassword() != null) {
            findMember.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        if (member.getImage() != null) {
            findMember.setImage(member.getImage());
        }

        return findMember;
    }

    public void deleteMember(Long memberId) {

        Member loginMember = findLoginMember();

        if (!loginMember.getMemberId().equals(memberId) & !loginMember.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
        }

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

        Member loginMember = findLoginMember();
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        if (loginMember.getRoles().contains("ADMIN"))
            return findMember.get();
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
}
