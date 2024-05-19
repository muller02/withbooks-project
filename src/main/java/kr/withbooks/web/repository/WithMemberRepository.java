package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WithMemberRepository {

    // 위드 가입
    Integer add(Long userId, Long withId,Long masterYn);

    // 위드 가입 여부
    Integer findJoinYn(Long withId, Long userId);

    // 위드 탈퇴
    Integer delete(Long withId, Long userId);
}
