package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.BookshortsView;
import kr.withbooks.web.entity.User;

public interface UserService {

    User getById(Long userId);

    void modify(User user);

    String getNickNameById(Long userId);

    void join(User user);


    

    Integer emailCheck(String email);
    
    List<User> get(Long id,String nickname,String email,String birthyear,Integer gender,String startDate,String endDate,Integer status);
    List<BookshortsView> getByIdShorts(Long id);
}
