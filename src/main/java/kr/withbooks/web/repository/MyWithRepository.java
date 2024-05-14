package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyWithRepository {

    public List<Long> findByUserId(Long userId);

}
