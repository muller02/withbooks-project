package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.User;

@Mapper
public interface UserRepository {
    

    User findByEmail(String email);

    User findById(Long userId);

    void update(User user);
    String findByNickName(Long userId);

    List<User> findByAll(Long id, String nickname, String email, String birthyear, Integer gender, String startDate,
            String endDate, Integer status);

}
