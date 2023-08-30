package main.wonprice.domain.member.service;

import main.wonprice.auth.utils.CustomAuthorityUtils;
import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.MemberStatus;
import main.wonprice.domain.member.repository.MemberRepository;
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

        checkExistName(member.getName());
        checkExistEmail(member.getEmail());
        checkExistPhone(member.getPhone());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

//    로그인 구현 후 관리자일 경우 조회한 회원 상태에 상관없이 조회 가능하게 구현
    public Member findMember(Long memberId) {

        Member findMember = findVerifyMember(memberId);

        if (findLoginMember().getRoles().contains("ADMIN")) {
            return findMember;
        }
        if (findMember.getStatus().equals(MemberStatus.ACTIVE)) {
            return findMember;
        }
        else throw new RuntimeException("삭제된 회원");
    }

//    관리자용 전체 회원 목록
    public List<Member> findMembers(Pageable pageable) {
        return memberRepository.findAll(pageable).getContent();
    }

    public Member updateMember(Member member) {

        Member loginMember = findLoginMember();

        if (!loginMember.getMemberId().equals(member.getMemberId()) & !loginMember.getRoles().contains("ADMIN")) {
            throw new RuntimeException("권한 없는 접근");
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
            throw new RuntimeException("권한 없는 접근");
        }

        Member findMember = findVerifyMember(memberId);

        findMember.setStatus(MemberStatus.DELETE);
        findMember.setDeletedAt(LocalDateTime.now());
    }

//    입력한 이름으로 가입한 회원이 있는지 확인
    private void checkExistName(String name) {
        Optional<Member> findByNameMember = memberRepository.findByName(name);
        if (findByNameMember.isPresent()) {
            throw new RuntimeException("이미 존재하는 이름");
        }
    }

//    입력한 이메일으로 가입한 회원이 있는지 확인
    private void checkExistEmail(String email) {
        Optional<Member> findByNameMember = memberRepository.findByEmail(email);
        if (findByNameMember.isPresent()) {
            throw new RuntimeException("이미 존재하는 이메일");
        }
    }

//    입력한 번호로 가입한 회원이 있는지 확인
    private void checkExistPhone(String phone) {
        Optional<Member> findByNameMember = memberRepository.findByPhone(phone);
        if (findByNameMember.isPresent()) {
            throw new RuntimeException("이미 존재하는 번호");
        }
    }

//    해당 id의 회원이 있는지 확인 후 리턴
    private Member findVerifyMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow();
    }

//    로그인 중인 회원 정보 리턴
    public Member findLoginMember() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = memberRepository.findByEmail(authentication.getName()).orElseThrow();

        return loginMember;
    }

    public boolean validatePassword(String password) {
        Member loginMember = findLoginMember();

        return passwordEncoder.matches(password, loginMember.getPassword());
    }
}
