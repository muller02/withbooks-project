package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WithMemberRepository {

    int add(Long userId, Long withId);

    Integer findJoinYn(Long withId, Long userId);
}
