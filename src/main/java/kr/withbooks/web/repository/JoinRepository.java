package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.User;

@Mapper
public interface JoinRepository {
    
    void save(User user);

}
