package kr.withbooks.web.repository;


import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithCategoryRepository {

    void save(Long withId, List<Long> withCategoryIdList);
}
