package kr.withbooks.web.repository;

import kr.withbooks.web.entity.WithMemberView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithMemberViewRepository {

    List<WithMemberView> findByWithId(Long withId);


}
