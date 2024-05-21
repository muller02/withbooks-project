package kr.withbooks.web.repository;

import kr.withbooks.web.entity.WithMember;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithMemberRepository {

    // 위드 가입
    Integer add(Long userId, Long withId,Long masterYn);

    // 위드 가입 여부
    Integer findJoinYn(Long withId, Long userId);

    // 위드 탈퇴
    Integer delete(Long withId, Long userId);

    List<WithMember> findAll(Long withId);
}
