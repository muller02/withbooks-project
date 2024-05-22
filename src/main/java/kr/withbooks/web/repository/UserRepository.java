package kr.withbooks.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.Bookshorts;
import kr.withbooks.web.entity.BookshortsView;
import kr.withbooks.web.entity.User;

@Mapper
public interface UserRepository {
    

    User findByEmail(String email);

    User findById(Long userId);

    void update(User user);
    String findByNickName(Long userId);

    int save(User user);

    // /user/join 이메일 중복 체크
    Integer countByEmail(String email);
    Integer countByNickname(String nickname);


    // admin/user
    List<User> findByAll(Map<String, String> params, Integer size,Integer offset);
    List<BookshortsView> findByIdShorts(Long id);
    Integer count(Map<String, String> params, Integer size,Integer offset);
    Integer updateWithdrawStatus(Integer status, List<Integer> ids);



}
