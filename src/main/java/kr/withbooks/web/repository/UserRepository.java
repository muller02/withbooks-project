package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.User;

@Mapper
public interface UserRepository {
    

    User findByEmail(String email);

    User findById(Long userId);

    void update(User user);
    String findByNickName(Long userId);

}
