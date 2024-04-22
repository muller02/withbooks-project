package kr.withbooks.web.repository;

import kr.withbooks.web.entity.WithMember;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithMemberRepository {


    List<WithMember> findByWithId(Long withId);

}
