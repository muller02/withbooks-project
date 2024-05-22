package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import kr.withbooks.web.entity.BookshortsView;
import kr.withbooks.web.entity.User;

public interface UserService {

    User getById(Long userId);

    void modify(User user);

    String getNickNameById(Long userId);

    int join(User user);

    Integer emailCheck(String email);
    Integer nicknameCheck(String nickname);
    
    List<BookshortsView> getByIdShorts(Long id);
    
    // admin/user
    List<User> get(Map<String, String> params);
    Integer getCount(Map<String, String> params);
    Integer updateWithdrawStatus(Integer status, List<Integer> ids);
}
